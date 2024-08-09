import { ProductModel } from '@/types';
import classNames from 'classnames';
import { Fragment } from 'react';

interface IIngredientsProps {
	className?: string;
	product?: ProductModel;
}

const Ingredients: React.FC<IIngredientsProps> = ({ className, product }) => {
	if (product?.ingredients === undefined) {
		return null;
	}

	const ingredients = product.ingredients;
	const additionalIngredients =
		product.additionalIngredients?.filter((x) => (x.quantity ?? 0) > 0) ?? [];

	const additionalIngredientsText = additionalIngredients
		.map((ingredient) => {
			if (ingredient.quantity && ingredient.quantity > 1) {
				return `${ingredient.name} x${ingredient.quantity}`;
			}
			return ingredient.name;
		})
		.join(', ');

	return (
		<div>
			<p className={classNames(className, 'text-[14px]')}>
				{ingredients.map((item, index) => {
					const comma = index < ingredients.length - 1 ? ', ' : '';

					return item.removed ? (
						<Fragment key={index}>
							<span className={'line-through text-[var(--color-error)]'}>
								{item.name}
							</span>
							{comma}
						</Fragment>
					) : (
						`${item.name}${comma}`
					);
				})}
			</p>
			{additionalIngredients.length > 0 && (
				<p className={classNames(className, 'text-[14px]')}>
					Dodatki: {additionalIngredientsText}
				</p>
			)}
		</div>
	);
};

export { Ingredients };
