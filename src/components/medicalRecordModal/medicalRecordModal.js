import {useEffect, useState} from 'react';
import {notification, Form, Input, InputNumber, Flex, Button, Select, Table, Tooltip, Typography, Divider, Modal} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
import {getMedicines} from '../../services/medicine.service';
import {createMedicalRecord, updateMedicalRecord} from '../../services/medicalRecord.service';
import columnsTable from './columnsTable';
import {medicineUsage} from "../../utils/constant";
import dayjs from "dayjs";

function MedicalRecordModal ({appointmentId, selectedRecord, onCancel, visible, reload, setReload, setResult}) {
    const [form] = Form.useForm();
    const [listMedicine, setListMedicine] = useState([]);
    const [medicinesAdded, setMedicinesAdded] = useState([]);
    const [selectedMedicine, setSelectedMedicine] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(0);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await getMedicines();
                if (response.code === 200) {
                    const newData = response.data.map(item => ({
                        ...item,
                        label: item.name,
                        value: item._id,
                    }));
                    setListMedicine(newData);
                } else {
                    notification.error({
                        message: 'Error',
                        description: response.message,
                    });
                }
            } catch(error) {
                notification.error({
                    message: 'Error',
                    description: error.message,
                });
            }
        }

        fetchApi();
    }, []);

    useEffect(() => {
        if (selectedRecord) {
            form.setFieldsValue(selectedRecord);
            setMedicinesAdded(selectedRecord.medicines);
        }
    }, [form, selectedRecord]);

    const handleAddMedicine = () => {
        if (selectedMedicine) {
            const medicineExist = medicinesAdded.find(medicine => medicine.medicineId === selectedMedicine.medicineId);
            if (medicineExist) {
                const newMedicines = medicinesAdded.map(medicine => {
                    if (medicine.medicineId === selectedMedicine.medicineId) {
                        return {
                            ...medicine,
                            quantity: selectedQuantity,
                        }
                    }
                    return medicine;
                });
                setMedicinesAdded(newMedicines);
            } else {
                setMedicinesAdded([...medicinesAdded, {
                    ...selectedMedicine,
                    quantity: selectedQuantity,
                }]);
            }
            resetMedicine();
        }
    }

    const handleEdit = (record) => {
        const tempMedicine = listMedicine.find(medicine => medicine._id === record.medicineId);
        setSelectedMedicine({
            ...tempMedicine,
            medicineId: tempMedicine._id,
        });
        setSelectedQuantity(record.quantity);
    }

    const handleRemoveMedicine = (record) => {
        const medicines = medicinesAdded.filter(
            (item) => item.name !== record.name
        );
        setMedicinesAdded(medicines);
    }

    const resetMedicine = () => {
        setSelectedMedicine(null);
        setSelectedQuantity(0);
    }

    const handleCancel = () => {
        form.resetFields();
        setMedicinesAdded([]);
        resetMedicine();
        onCancel();
    }

    const handleOk = async () => {
        try {
            const value = await form.validateFields();
            value.medicines = medicinesAdded.map(medicine => ({
                medicineId: medicine.medicineId,
                name: medicine.name,
                usage: medicine.usage,
                quantity: medicine.quantity,
                price: medicine.price,
            }));
            value.appointment = appointmentId;
            value.updatedAt = dayjs();
            let response;
            if (selectedRecord) {
                response = await updateMedicalRecord(selectedRecord._id, value);
            } else {
                response = await createMedicalRecord(value);
                setReload(!reload);
            }
            setResult(response.data);
            if (response.code === 200) {
                notification.success({
                    message: 'Success',
                    description: response.message,
                });
                handleCancel();
                setReload(!reload);
            } else {
                notification.error({
                    message: 'Error',
                    description: response.message,
                });
            }
        } catch(error) {
            notification.error({
                message: 'Error',
                description: error.message,
            });
        }
    }

    return (
        <>
            <>
                <Modal
                    open={visible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    okText="Save"
                    cancelText="Cancel"
                    centered
                    width={600}
                    destroyOnClose
                    styles={{
                        content: { height: "95vh", overflowY: "scroll" },
                    }}
                >
                    <Typography.Title level={2} style={{textAlign: "center"}}>Examination Detail</Typography.Title>
                    <Form
                        form={form}
                        wrapperCol={{ span: 24 }}
                        labelCol={{ span: 4 }}
                        labelAlign="left"
                    >
                        <Form.Item
                            label="Result"
                            name="result"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input result",
                                },
                            ]}
                        >
                            <Input.TextArea required />
                        </Form.Item>
                        <Form.Item label="Note" name="note">
                            <Input.TextArea />
                        </Form.Item>
                        <Form.Item label="Medicine">
                            <Flex justify="space-between">
                                <Select
                                    style={{ width: 270 }}
                                    placeholder="Select Medicine"
                                    options={listMedicine}
                                    onChange={(value, item) => {
                                        setSelectedMedicine({
                                            ...item,
                                            medicineId: value,
                                        });
                                    }}
                                    value={selectedMedicine?.medicineId || null}
                                />
                                <InputNumber
                                    style={{ width: 100 }}
                                    min={0}
                                    placeholder="Quantity"
                                    value={selectedQuantity}
                                    onChange={(value) => {
                                        setSelectedQuantity(value);
                                    }}
                                />
                                <Tooltip title="Reset">
                                    <Button onClick={resetMedicine} icon={<ReloadOutlined />} />
                                </Tooltip>
                            </Flex>
                        </Form.Item>
                        <Form.Item label="Usage">
                            <Flex align="center" justify="space-between">
                                <Typography.Text>{medicineUsage(selectedMedicine?.usage)}</Typography.Text>
                                <Divider type="vertical" />
                                <Button
                                    style={{ width: 100 }}
                                    type="primary"
                                    onClick={handleAddMedicine}
                                    disabled={!selectedMedicine || selectedQuantity === 0}
                                >
                                    {"Add"}
                                </Button>
                            </Flex>
                        </Form.Item>
                        <Table rowKey="medicineId" dataSource={medicinesAdded} columns={columnsTable(handleEdit, handleRemoveMedicine)} pagination={false} />
                    </Form>
                </Modal>
            </>
        </>
    );
}

export default MedicalRecordModal;