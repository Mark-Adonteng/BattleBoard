import React from 'react';

interface BattleBoardProps {
    data: any[];
    columns: string[];
    onShowForm: () => void;
    onDownloadCSV: () => void;
    onSend: () => void;
    missionName: string;
}

const columnDescriptions: { [key: string]: string } = {
    Serial: 'Serial number of the mission entry',
    Time: 'Time of the mission event',
    StationFrom: 'Origin station of the mission',
    StationTo: 'Destination station of the mission',
    Activity: 'Activity description',
    Frequency: 'Communication frequency',
    Information: 'Additional information',
    Precedence: 'Precedence level',
    Action: 'Action to be taken'
};

const BattleBoard: React.FC<BattleBoardProps> = ({ data, columns, onShowForm, onDownloadCSV, onSend, missionName }) => {
    return (
        <div className="bg-white p-8 shadow-md rounded-lg w-full w-4xl mt-8">
            <button
                className="bg-black rounded-md text-white w-36 h-12 ml-[100rem]"
                onClick={onShowForm}
            >
                + Add more data
            </button>
            <h2 className="text-center mb-4 text-gray-700 text-xl font-bold">MISSION {missionName}</h2>
            <table className="min-w-full bg-white text-center">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column}
                                className="py-2 px-4 bg-gray-200 text-gray-600"
                                title={columnDescriptions[column] || ''}
                            >
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, index) => (
                        <tr key={index}>
                            {columns.map((column) => (
                                <td key={column} className="py-2 px-4 border-b">
                                    {column === 'StationFrom' && (
                                        <a href={`https://maps.google.com/?q=${encodeURIComponent(row[column])}`} target="_blank" rel="noopener noreferrer">
                                            {row[column]}
                                        </a>
                                    )}
                                    {column !== 'StationFrom' && row[column]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='flex space-x-6'>
                <button className="bg-black rounded-md text-white w-28 h-12 mt-5" onClick={onDownloadCSV}>
                    DOWNLOAD
                </button>
                <button className="bg-black rounded-md text-white w-28 h-12 mt-5" onClick={onSend}>
                    SEND
                </button>
            </div>
        </div>
    );
};

export default BattleBoard;
