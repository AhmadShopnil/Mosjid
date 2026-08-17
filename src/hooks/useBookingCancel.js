import { useState } from 'react';
import axiosInstance from '@/helper/axiosInstance';

/**
 * useBookingCancel – reusable hook for cancelling any booking via a status endpoint.
 *
 * Usage:
 *   const { cancelState, openCancel, closeCancel, confirmCancel } = useBookingCancel({
 *     // Build the endpoint for the booking id, e.g.:
 *     getEndpoint: (id) => `/marriage/${id}/status`,
 *     onSuccess: () => fetchData(),   // called after successful cancel
 *   });
 *
 * Returned values:
 *   cancelState  { isOpen, isLoading, bookingId }
 *   openCancel   (booking)  → opens the confirmation modal for that booking
 *   closeCancel  ()         → closes without doing anything
 *   confirmCancel()         → fires the API call, then calls onSuccess / shows error toast
 */
const useBookingCancel = ({ getEndpoint, onSuccess }) => {
  const [cancelState, setCancelState] = useState({
    isOpen: false,
    isLoading: false,
    bookingId: null,
  });

  const openCancel = (booking) => {
    setCancelState({ isOpen: true, isLoading: false, bookingId: booking.id });
  };

  const closeCancel = () => {
    setCancelState({ isOpen: false, isLoading: false, bookingId: null });
  };

  const confirmCancel = async () => {
    if (!cancelState.bookingId) return;
    setCancelState((prev) => ({ ...prev, isLoading: true }));

    try {
      const endpoint = getEndpoint(cancelState.bookingId);
      // Send status=3 to indicate cancellation (adjust value if your API uses different code)
      await axiosInstance.post(endpoint, {});
      closeCancel();
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error('Cancel booking failed:', err);
      const msg = err?.response?.data?.message || 'Failed to cancel booking. Please try again.';
      alert(msg);
      setCancelState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  return { cancelState, openCancel, closeCancel, confirmCancel };
};

export default useBookingCancel;
