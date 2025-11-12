import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { 
  addToCart as addToCartAction, 
  removeFromCart as removeFromCartAction,
  removeAllFromCart as removeAllFromCartAction,
  clearCart as clearCartAction,
  updateCart as updateCartAction,
  selectCartItems,
  selectCartTotal,
  selectCartItemCount,
  CartItem
} from '../store/slices/cartSlice';

export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const itemCount = useSelector(selectCartItemCount);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    dispatch(addToCartAction(item));
  };

  const removeFromCart = (itemId: number) => {
    dispatch(removeFromCartAction(itemId));
  };

  const removeAllFromCart = (itemId: number) => {
    dispatch(removeAllFromCartAction(itemId));
  };

  const updateCartItem = (itemId: number, quantity: number) => {
    dispatch(updateCartAction({ id: itemId, quantity }));
  };

  const clearCart = () => {
    dispatch(clearCartAction());
  };

  const getItemQuantity = (itemId: number): number => {
    const item = items.find(item => item.id === itemId);
    return item ? item.quantity : 0;
  };

  return {
    items,
    total,
    itemCount,
    addToCart,
    removeFromCart,
    removeAllFromCart,
    updateCartItem,
    clearCart,
    getItemQuantity,
  };
};

export default useCart;
