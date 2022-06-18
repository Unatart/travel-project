import * as React from "react";

export interface INavigableItemProps {
    is_active?:boolean;
    onClick?:() => void;
}

export function withNavigation<Props extends INavigableItemProps>(ItemComponent:React.ComponentType<Props>) {
    const ItemWithNavigation:React.FC<Props> = (props) => {
        const [is_active, setIsActive] = React.useState(false);

        React.useEffect(() => {
            if (props.is_active !== undefined) {
                setIsActive(props.is_active);
            }
        }, [props.is_active]);

        const onClick = () => {
            setIsActive(true);
            props.onClick?.();
        }

        return (
            <ItemComponent
                {...props}
                is_active={is_active}
                onClick={onClick}
            />
        );
    };

    return ItemWithNavigation;
}