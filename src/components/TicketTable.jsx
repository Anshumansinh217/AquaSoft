import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPrint, faTrash, faEye, faRupeeSign, faSort } from '@fortawesome/free-solid-svg-icons';

const TicketTable = ({ tickets }) => {
  return (
    <div className="ticket-table-container overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="ticket-table w-full">
        <thead className="bg-gray-50">
          <tr>
            <TableHeader title="Time" sortable />
            <TableHeader title="Ticket No" sortable />
            <TableHeader title="Date" />
            <TableHeader title="Adult" center />
            <TableHeader title="Children" center />
            <TableHeader title="Tickets" center />
            <TableHeader title="Payment By" />
            <TableHeader title="Amount" />
            <TableHeader title="Actions" center />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tickets.map((ticket) => (
            <TicketRow key={ticket.id || ticket.ticketNo} ticket={ticket} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHeader = ({ title, center = false, sortable = false }) => (
  <th
    scope="col"
    className={`px-4 py-3 text-xs font-medium text-gray-700 uppercase tracking-wider ${
      center ? 'text-center' : 'text-left'
    } ${sortable ? 'cursor-pointer hover:bg-gray-100' : ''}`}
  >
    <div className={`flex items-center ${center ? 'justify-center' : ''}`}>
      {title}
      {sortable && (
        <FontAwesomeIcon 
          icon={faSort} 
          className="ml-1.5 text-gray-400 text-xs"
        />
      )}
    </div>
  </th>
);

const TicketRow = ({ ticket }) => {
  return (
    <tr className="hover:bg-gray-50 transition-colors">
      <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-800">
        {ticket.time}
      </td>
      <td className="px-3 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
        #{ticket.ticketNo}
      </td>
      <td className="px-3 py-1 whitespace-nowrap text-sm text-gray-800">
        {ticket.date}
      </td>
      <td className="px-3 py-1 whitespace-nowrap text-sm text-center text-gray-800">
        {ticket.adult}
      </td>
      <td className="px-3 py-1 whitespace-nowrap text-sm text-center text-gray-800">
        {ticket.children}
      </td>
      <td className="px-3 py-1 whitespace-nowrap text-sm text-center font-medium text-gray-900">
        {ticket.adult + ticket.children}
      </td>
      <td className="px-3 py-1 whitespace-nowrap text-sm">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          ticket.paymentBy === 'Card' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-green-100 text-green-800'
        }`}>
          {ticket.paymentBy}
        </span>
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
        <FontAwesomeIcon icon={faRupeeSign} className="mr-1 text-gray-600" />
        {ticket.amount}
      </td>
      <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
        <div className="flex items-center justify-center space-x-2">
          <ActionButton icon={faEye} color="blue" />
          <ActionButton icon={faPrint} color="green" />
          <ActionButton icon={faEdit} color="purple" />
          <ActionButton icon={faTrash} color="red" />
        </div>
      </td>
    </tr>
  );
};

const ActionButton = ({ icon, color }) => (
  <button className={`p-1.5 rounded-md hover:bg-${color}-50 text-${color}-600 hover:text-${color}-800 transition-colors`}>
    <FontAwesomeIcon icon={icon} className="w-4 h-4" />
  </button>
);

export default TicketTable;