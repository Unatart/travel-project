import * as React from "react";

export interface INavigableItemProps {
    is_active?:boolean;
    onClick?:(active?:boolean) => void;
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
            setIsActive(!is_active);
            props.onClick?.(!is_active);
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