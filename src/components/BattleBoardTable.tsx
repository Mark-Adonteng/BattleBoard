import React, { useState } from "react";
import { useMission} from '../context/MissionContext';

interface RowData {
  ser: string;
  time: string;
  stationFrom: string;
  stationTo: string;
  activity: string;
  freq: string;
  info: string;
  precedence: string;
  action: string;
}

const BattleBoardTable: React.FC = () => {
  const { missionName } = useMission();
  const [activeRowIndex, setActiveRowIndex] = useState<number>(0);
  const [rowData, setRowData] = useState<RowData[]>(Array(10).fill({
    ser: '',
    time: '',
    stationFrom: '',
    stationTo: '',
    activity: '',
    freq: '',
    info: '',
    precedence: '',
    action: '',
  }));

  const handleChange = (field: keyof RowData, value: string, rowIndex: number) => {
    const newData = [...rowData];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [field]: value
    };
    setRowData(newData);
  };

  const handleUpdate = () => {
    console.log("Updated Data:", rowData);
    setActiveRowIndex(prevIndex => prevIndex < rowData.length - 1 ? prevIndex + 1 : prevIndex);
  };
  const handleDownload = () => {
    // Prepare table data as CSV
    const csvContent = rowData.map(row => Object.values(row).join(',')).join('\n');
    
    // Create a Blob containing the CSV data
    const blob = new Blob([csvContent], { type: 'text/csv' });

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    // Set the file name
    link.download = 'battle_board_table.csv';

    // Trigger the download
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  return (
    <div className="text-center">
      <div className="text-lg font-bold">
        <h1>MISSION {missionName}</h1>
        <div>15 FOX COY OPS</div>
      </div>
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="bg-gray-200 border border-black px-4 py-2">SER</th>
            <th className="bg-gray-200 border border-black px-4 py-2">TIME</th>
            <th className="bg-gray-200 border border-black px-4 py-2">STATION (FROM)</th>
            <th className="bg-gray-200 border border-black px-4 py-2">STATION (TO)</th>
            <th className="bg-gray-200 border border-black px-4 py-2">ACTIVITY</th>
            <th className="bg-gray-200 border border-black px-4 py-2">FREQ</th>
            <th className="bg-gray-200 border border-black px-4 py-2">INFO</th>
            <th className="bg-gray-200 border border-black px-4 py-2">PRECEDENCE</th>
            <th className="bg-gray-200 border border-black px-4 py-2">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {rowData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="border border-black px-4 py-2">
                <input type="text" value={row.ser} onChange={(e) => handleChange('ser', e.target.value, rowIndex)} disabled={rowIndex !== activeRowIndex} />
              </td>
              <td className="border border-black px-4 py-2">
                <input type="text" value={row.time} onChange={(e) => handleChange('time', e.target.value, rowIndex)} disabled={rowIndex !== activeRowIndex} />
              </td>
              <td className="border border-black px-4 py-2">
                <input type="text" value={row.stationFrom} onChange={(e) => handleChange('stationFrom', e.target.value, rowIndex)} disabled={rowIndex !== activeRowIndex} />
              </td>
              <td className="border border-black px-4 py-2">
                <input type="text" value={row.stationTo} onChange={(e) => handleChange('stationTo', e.target.value, rowIndex)} disabled={rowIndex !== activeRowIndex} />
              </td>
              <td className="border border-black px-4 py-2">
                <input type="text" value={row.activity} onChange={(e) => handleChange('activity', e.target.value, rowIndex)} disabled={rowIndex !== activeRowIndex} />
              </td>
              <td className="border border-black px-4 py-2">
                <input type="text" value={row.freq} onChange={(e) => handleChange('freq', e.target.value, rowIndex)} disabled={rowIndex !== activeRowIndex} />
              </td>
              <td className="border border-black px-4 py-2">
                <input type="text" value={row.info} onChange={(e) => handleChange('info', e.target.value, rowIndex)} disabled={rowIndex !== activeRowIndex} />
              </td>
              <td className="border border-black px-4 py-2">
                <input type="text" value={row.precedence} onChange={(e) => handleChange('precedence', e.target.value, rowIndex)} disabled={rowIndex !== activeRowIndex} />
              </td>
              <td className="border border-black px-4 py-2">
                <input type="text" value={row.action} onChange={(e) => handleChange('action', e.target.value, rowIndex)} disabled={rowIndex !== activeRowIndex} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="bg-black rounded-md text-white w-28 h-8 mt-5" onClick={handleUpdate}>
        UPDATE
      </button>
      {/* <button className="bg-black rounded-md text-white w-28 h-8 mt-5" onClick={handleSend}>
        SEND
      </button> */}
      <button className="bg-black rounded-md text-white w-28 h-8 mt-5" onClick={handleDownload}>
        DOWNLOAD
      </button>
    </div>
  );
};

export default BattleBoardTable;
