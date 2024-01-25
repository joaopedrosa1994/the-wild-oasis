import styled from 'styled-components';
import { format, isToday } from 'date-fns';

import Tag from '../../ui/Tag';
import Table from '../../ui/Table';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

import { formatCurrency } from '../../utils/helpers';
import { formatDistanceFromNow } from '../../utils/helpers';

import Menus from '../../ui/Menus';
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import { useCheckout } from '../check-in-out/useCheckout';
import { useDeleteBooking } from './useDeleteBookin';

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    // created_at,
    startDate,
    endDate,
    numNights,
    // numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  const navigate = useNavigate();
  const { checkout, isCheckout } = useCheckout();
  const { deleteBooking, isDeleting } = useDeleteBooking();
  return (
    <Table.Row>
      <Cabin>{cabinName}</Cabin>

      <Stacked>
        <span>{guestName}</span>
        <span>{email}</span>
      </Stacked>

      <Stacked>
        <span>
          {isToday(new Date(startDate))
            ? 'Today'
            : formatDistanceFromNow(startDate)}{' '}
          &rarr; {numNights} night stay
        </span>
        <span>
          {format(new Date(startDate), 'MMM dd yyyy')} &mdash;{' '}
          {format(new Date(endDate), 'MMM dd yyyy')}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>

      <Amount>{formatCurrency(totalPrice)}</Amount>
      <Modal>
        <Menus.menu>
          <Menus.toggle id={bookingId} />
          <Menus.list id={bookingId}>
            <Menus.button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.button>
            {status === 'unconfirmed' && (
              <Menus.button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check In
              </Menus.button>
            )}
            {status === 'checked-in' && (
              <Menus.button
                disabled={isCheckout}
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkout(bookingId)}
              >
                Check Out
              </Menus.button>
            )}

            <Modal.open opens='delete'>
              <Menus.button icon={<HiTrash />}>Delete</Menus.button>
            </Modal.open>
          </Menus.list>
        </Menus.menu>
        <Modal.window name='delete'>
          <ConfirmDelete
            disabled={isDeleting}
            resourceName='booking'
            onConfirm={() => deleteBooking(bookingId)}
          />
        </Modal.window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;