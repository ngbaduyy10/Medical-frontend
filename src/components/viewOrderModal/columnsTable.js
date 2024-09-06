import {medicineUsage, formatPrice} from "../../utils/constant";

const columnsTable = () => {
    return [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            width: 120,
            title: "Usage",
            dataIndex: "usage",
            key: "usage",
            align: "center",
            render: (usage) => medicineUsage(usage),
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
            width: 120,
            align: "end",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
            width: 150,
            align: "end",
            render: (price) => {
                return formatPrice(price);
            },
        },
        {
            title: "Total",
            key: "total",
            width: 150,
            align: "end",
            render: (_, record) => {
                return formatPrice(record.price * record.quantity);
            },
        },
    ]
}

export default columnsTable;