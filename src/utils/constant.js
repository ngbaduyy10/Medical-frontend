import { Tag } from "antd";

export const STATUS_BOOKING_COLOR = {
    medicine: "lime",
    finished: "green",
    booked: "blue",
    examining: "cyan",
    waiting: "orange",
    rejected: "red",
    cancelled: "red",
};

export const STATUS_MEDICAL_COLOR = {
    examined: "green",
    medicine: "blue",
};

export const USER_TYPE_COLOR = {
    admin: "red",
    doctor: "green",
    staff: "blue",
    sales: "orange",
    customer: "yellow",
    user: "purple",
};

export const formatPrice = (price) => {
    if (!price) {
        price = 0;
    }
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(price);
}

export const medicineUsage = (usage) => {
    let color = "";
    let text = "";

    switch (usage) {
        case "before":
            color = "green";
            text = "Before meal";
            break;
        case "after":
            color = "blue";
            text = "After meal";
            break;
        case "both":
            color = "orange";
            text = "Before / After meal";
            break;
        default:
            return "";
    }

    return <Tag color={color}>{text}</Tag>;
};

export const PAYMENT_METHOD_COLOR = {
    cash: "green",
    banking: "orange",
};

export const STATUS_ORDER_COLOR = {
    pending: "orange",
    paid: "blue",
};