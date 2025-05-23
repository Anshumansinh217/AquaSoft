import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPrint, faTrash, faEye, faRupeeSign } from '@fortawesome/free-solid-svg-icons';

const TicketRow = ({ ticket }) => {
  return (
    <tr className="ticket-row hover:scale-[1.03] transition-transform duration-200">
      <td className="p-3 border-b border-gray-200">{ticket.time}</td>
      <td className="p-3 border-b border-gray-200 font-medium">#{ticket.ticketNo}</td>
      <td className="p-3 border-b border-gray-200">{ticket.date}</td>
      <td className="p-3 border-b border-gray-200 text-center">{ticket.adult}</td>
      <td className="p-3 border-b border-gray-200 text-center">{ticket.children}</td>
      <td className="p-3 border-b border-gray-200 text-center font-medium">
        {ticket.adult + ticket.children}
      </td>
      <td className="p-3 border-b border-gray-200">
        <span className={`payment-method ${ticket.paymentBy === 'Card' ? 'text-blue-600' : 'text-green-600'}`}>
          {ticket.paymentBy}
        </span>
      </td>
      <td className="p-3 border-b border-gray-200 font-medium">
        <FontAwesomeIcon icon={faRupeeSign} className="mr-1" />
        {ticket.amount}
      </td>
      <td className="p-3 border-b border-gray-200">
        <div className="flex gap-2 justify-center">
          <button className="action-btn view">
            <FontAwesomeIcon icon={faEye} className="text-blue-600" />
          </button>
          <button className="action-btn print">
            <FontAwesomeIcon icon={faPrint} className="text-green-600" />
          </button>
          <button className="action-btn edit">
            <FontAwesomeIcon icon={faEdit} className="text-purple-600" />
          </button>
          <button className="action-btn delete">
            <FontAwesomeIcon icon={faTrash} className="text-red-600" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TicketRow;