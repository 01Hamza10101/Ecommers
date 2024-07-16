import Order from "../models/Order.model.js";

async function CancelOrder(req, res) {
    const { OrderCard, ProductId, CurrentPrice } = req.body;

    // Basic validation
    if (!OrderCard || !ProductId || typeof CurrentPrice !== 'number') {
        return res.status(400).json({ msg: 'Invalid input data!' });
    }

    try {
        
        const order = await Order.findOneAndUpdate(
            { _id: OrderCard },
            {
                $pull: {
                    ProductIds: {
                        ProductId,
                    },
                },
                $inc: {
                    TotalAmount: - CurrentPrice,
                },
            },
            { new: true } 
        );

        if (!order) {
            return res.status(404).json({ msg: 'Order not found!' });
        }

        if (order.ProductIds.length === 0) {
            await Order.deleteOne({ _id: OrderCard });
            return res.status(200).json({ msg: 'Order canceled and deleted successfully' });
        }

        res.status(200).json({ msg: 'Product removed from order successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Order cancellation failed!' });
    }
}

export default CancelOrder;
