
interface IPorter<T> {
    begin:number,
    end:number,
    getLoadedData:() => T[];
    loadData:(from:number, to:number) => Promise<void>;
}

export function createPorter<T>(load:(from:number, to:number) => Promise<T[]>):IPorter<T> {
    let loaded_data:T[] = [];
    let begin = 0;
    let end = 0;

    return {
        begin,
        end,
        getLoadedData: () => loaded_data,
        loadData: async (from, to) => {
            const data_chunk = await load(from, to);
            if (loaded_data.length === 0) {
                loaded_data = data_chunk;
            }
            if (from > end) {
                loaded_data = [ ...loaded_data, ...data_chunk ];
            }
            if (to < begin) {
                loaded_data = [ ...data_chunk, ...loaded_data ];
            }

            console.log(loaded_data);
        }
    };
}