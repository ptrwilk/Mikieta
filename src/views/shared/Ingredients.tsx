import { IngredientModel } from '@/types';
import classNames from 'classnames';

interface IIngredientsProps {
	className?: string;
	ingredients?: IngredientModel[];
}

const Ingredients: React.FC<IIngredientsProps> = ({
	className,
	ingredients = [],
}) => {
	if (ingredients === undefined) {
		return null;
	}

	return (
		<p className={classNames(className, 'text-[14px]')}>
			{ingredients.map((item, index) => {
				const comma = index < ingredients.length - 1 ? ', ' : '';

				return item.removed ? (
					<>
						<span className={'line-through text-[var(--color-error)]'}>
							{item.name}
						</span>
						{comma}
					</>
				) : (
					`${item.name}${comma}`
				);
			})}
		</p>
	);
};

export { Ingredients };
