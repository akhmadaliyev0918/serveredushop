const Cart = require('../model/cart_model');
const Product = require('../model/product_model');
const response = require('../utils/response');

const GetFromCart = async (req, res) => {
    try {
        const { userId } = req.params;
        const cartData = await Cart.findOne({ userId }).populate('items.productId');

        if (!cartData) {
            return response.error(res, 'Cart not found for this user');
        }

        const allProducts = await Product.find();
        const filteredItems = cartData.items.filter(cartItem =>
            allProducts.some(product => product._id.equals(cartItem.productId._id))
        );

        const formattedData = filteredItems.map(cartItem => {
            const product = allProducts.find(p => p._id.equals(cartItem.productId._id));
            return {
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: cartItem.quantity,
                image: product.image,
                Itemquantity: product.quantity
            };
        });

        return response.success(res, 'Filtered cart data', formattedData);
    } catch (err) {
        return response.serverError(res, 'Error retrieving cart data', err);
    }
};

const addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        const cartData = await Cart.findOne({ userId });

        if (cartData) {
            const itemIndex = cartData.items.findIndex(item => item.productId.equals(productId));
            if (itemIndex > -1) {
                cartData.items[itemIndex].quantity += quantity;
            } else {
                cartData.items.push({ productId, quantity });
            }
            await cartData.save();
            return response.success(res, 'Product added successfully');
        } else {
            const newData = new Cart({
                userId,
                items: [{ productId, quantity }]
            });
            await newData.save();
            return response.success(res, 'Product added successfully');
        }
    } catch (error) {
        return response.serverError(res, 'Error adding product to cart', error);
    }
};

const updateQuantity = async (req, res) => {
    try {
        const { userId } = req.params;
        const { productId, increment } = req.body;

        const cart = await Cart.findOne({ userId });
        if (!cart) return response.notFound(res, 'Cart not found');

        const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
        if (itemIndex === -1) return response.notFound(res, 'Product not found in cart');

        cart.items[itemIndex].quantity += increment ? 1 : -1;
        if (cart.items[itemIndex].quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        }

        await cart.save();
        return response.success(res, 'Quantity updated successfully', cart);
    } catch (error) {
        return response.serverError(res, 'Error updating quantity', error);
    }
};

const deleteAllItems = async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await Cart.deleteMany({ userId });

        if (result.deletedCount > 0) {
            return response.success(res, 'All items deleted from cart successfully');
        }
        return response.error(res, 'No items found to delete');
    } catch (error) {
        return response.serverError(res, 'Error deleting all items from cart', error);
    }
};

const deleteItem = async (req, res) => {
    try {
        const { userId, productId } = req.params;
        const cart = await Cart.findOne({ userId });

        if (!cart) return response.notFound(res, 'Cart not found');

        const itemIndex = cart.items.findIndex(item => item.productId.equals(productId));
        if (itemIndex === -1) return response.notFound(res, 'Product not found in cart');

        cart.items.splice(itemIndex, 1);
        await cart.save();
        return response.success(res, 'Item deleted successfully');
    } catch (error) {
        return response.serverError(res, 'Error deleting item from cart', error);
    }
};

module.exports = {
    GetFromCart,
    addToCart,
    updateQuantity,
    deleteAllItems,
    deleteItem
};
