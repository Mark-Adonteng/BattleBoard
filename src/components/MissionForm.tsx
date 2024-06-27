import React, { useState, useEffect } from 'react';
import { useMission } from '../context/MissionContext';
import { db } from '../service/firebase'; // Adjust the path as needed
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import Table from './BattleBoard'; // Import the Table component
import { useUnit} from '../context/UnitContext';

interface MissionFormProps {
    Serial: number;
    Time: string;
    StationFrom: string;
    StationTo: string;
    Activity: string;
    Frequency: string;
    Message: string;
    Precedence: string;
    Action: string;
}

const MissionForm: React.FC = () => {
    const { missionName,missionType } = useMission();
    const {unit} =useUnit();

    const initialFormData = {
        Time: '',
        StationFrom: '',
        StationTo: '',
        Activity: '',
        Frequency: '',
        Message: '',
        Precedence: '',
        Action: ''
    };

    const [formData, setFormData] = useState(initialFormData);
    const [submittedData, setSubmittedData] = useState<MissionFormProps[]>([]);
    const [showTable, setShowTable] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [showAlertModal, setShowAlertModal] = useState(false);

    useEffect(() => {
        // Function to fetch data if missionName exists
        const fetchMissionData = async () => {
            if (!missionName) return;

            const q = query(collection(db, "missions"), where("missionName", "==", missionName));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const fetchedData: MissionFormProps[] = [];
                querySnapshot.forEach((doc) => {
                    fetchedData.push(doc.data() as MissionFormProps);
                });
                setSubmittedData(fetchedData);
                setShowTable(true);
            }
        };

        fetchMissionData();
    }, [missionName]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();

        if (Object.values(formData).some(value => value === '')) {
            setShowAlertModal(true);
            return;
        }

        // Assign a new serial number
        const newSerial = submittedData.length + 1;

        // Save data to Firestore
        try {
            const docRef = await addDoc(collection(db, "missions"), {
                missionName,
                Serial: newSerial,
                ...formData,
                Timestamp: new Date()
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }

        setSubmittedData([...submittedData, { Serial: newSerial, ...formData }]);
        setFormData(initialFormData);
        setShowTable(false);
    };

    const handleViewTable = () => {
        setShowTable(true);
    };

    const handleShowForm = () => {
        setShowTable(false);
    };

    const downloadCSV = () => {
        const csvContent = "data:text/csv;charset=utf-8," +
            ["Serial", ...Object.keys(initialFormData)].join(",") + "\n" +
            submittedData.map(data => Object.values(data).join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `mission_${missionName}.csv`);
        document.body.appendChild(link);
        link.click();
    };

    const handleSend = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleAttachAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAudioFile(file);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
            {!showTable && (
                <form className="bg-white p-8 shadow-md rounded-lg w-full max-w-4xl" onSubmit={handleUpdate}>
                    <button
                        type="button"
                        className="bg-black rounded-md text-white w-28 h-12 mt-5 fixed ml-[45rem]"
                        onClick={handleViewTable}
                    >
                        VIEW TABLE
                    </button>
                    <h1 className='text-center mb-8 block text-gray-700 text-2xl font-bold'>{missionType.toUpperCase()} {missionName.toUpperCase()}</h1>
                    <h2  className='text-center mb-4 block text-gray-700 text-xl font-bold'>{unit.toUpperCase()}</h2>
                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Time">
                                    Time
                                </label>
                                <input
                                    type="Time"
                                    id="Time"
                                    value={formData.Time}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="StationFrom">
                                    Station (FROM)
                                </label>
                                <input
                                    type="text"
                                    id="StationFrom"
                                    value={formData.StationFrom}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="StationTo">
                                    Station (TO)
                                </label>
                                <input
                                    type="text"
                                    id="StationTo"
                                    value={formData.StationTo}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Activity">
                                    Activity
                                </label>
                                <input
                                    type="text"
                                    id="Activity"
                                    value={formData.Activity}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Frequency">
                                    Frequency
                                </label>
                                <input
                                    type="text"
                                    id="Frequency"
                                    value={formData.Frequency}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Message">
                                    Message
                                </label>
                                <input
                                    type="text"
                                    id="Message"
                                    value={formData.Message}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Precedence">
                                    Precedence
                                </label>
                                <input
                                    type="text"
                                    id="Precedence"
                                    value={formData.Precedence}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Action">
                                    Action
                                </label>
                                <input
                                    type="text"
                                    id="Action"
                                    value={formData.Action}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                />
                            </div>
                        </div>
                    </div>
                    <button type="submit" className="bg-black rounded-md text-white w-28 h-12 mt-5">
                        UPDATE
                    </button>
                </form>
            )}

            {showTable && (
                <Table
                    data={submittedData}
                    columns={["Serial", ...Object.keys(initialFormData)]}
                    onShowForm={handleShowForm}
                    onDownloadCSV={downloadCSV}
                    onSend={handleSend}
                    missionName={missionName}
                />
            )}

            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Attach Audio</h3>
                                        <div className="mt-2">
                                            <input type="file" accept="audio/*" onChange={handleAttachAudio} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button type="button" onClick={closeModal} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-black text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-auto sm:text-sm">
                                    Attach
                                </button>
                                <button type="button" onClick={closeModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MissionForm;
