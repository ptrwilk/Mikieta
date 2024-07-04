import { ProductModel, translateProductType } from '@/types';
import { Counter } from '..';
import styles from './BasketItem.module.css';
import { productToPrice } from '@/helpers';
import { Ingredients } from '@/views/shared/Ingredients';

interface IBasketItemProps {
	item?: ProductModel;
	onRemoveItem?: () => void;
	onAddItem?: () => void;
}

const BasketItem: React.FC<IBasketItemProps> = ({
	item,
	onRemoveItem,
	onAddItem,
}) => {
	const { name, productType, pizzaType, description, quantity } = item || {};
	return (
		<div className={styles['BasketItem']}>
			<div className={styles['ProductDetails']}>
				<p className={styles['Name']}>
					{name}{' '}
					<span>{`(${translateProductType(productType!, pizzaType)})`}</span>
				</p>
				{description ? (
					<p className={styles['Description']}>{description}</p>
				) : (
					<Ingredients className='font-light italic' product={item} />
				)}
			</div>
			<div className={styles['Right']}>
				<p className={styles['Price']}>{productToPrice(item!)} zł</p>
				<Counter
					number={quantity}
					onMinusClick={onRemoveItem}
					onPlusClick={onAddItem}
				/>
			</div>
		</div>
	);
};

export { BasketItem };
