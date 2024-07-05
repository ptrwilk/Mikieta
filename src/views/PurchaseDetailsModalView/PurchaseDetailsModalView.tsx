import {
	Border,
	Button,
	Checkbox,
	CounterSecond,
	Modal,
	ModalRadio,
} from '@/components';
import { updateBasket, useAppContext } from '@/context/AppContext';
import { DialogHeader } from '../shared/DialogHeader/DialogHeader';
import pizzaImg from '../../assets/images/pizza.jpg';
import { productToPrice, sum } from '@/helpers';
import styles from './PurchaseDetailsModalView.module.css';
import { PizzaType, ProductModel } from '@/types';
import { useEffect, useState } from 'react';
import { SnacksCarouselSection } from './Sections/SnacksCarouselSection';
import { useMediaQuery } from 'react-responsive';
import { SnacksListSection } from './Sections/SnacksListSection';
import { Ingredients } from '../shared/Ingredients';
import { get } from '@/apihelper';

const PurchaseDetailsModalView = () => {
	const [app, updateApp] = useAppContext();

	const isMobile = useMediaQuery({ maxWidth: 500 });

	const {
		name,
		imageUrl,
		additionalIngredients = [],
		quantity,
		pizzaType,
	} = app!.purchaseModel || {};

	const [snacks, setSnacks] = useState<ProductModel[]>([]);

	const price = (type?: PizzaType) =>
		productToPrice({
			...app!.purchaseModel!,
			quantity: 1,
			pizzaType: type || app!.purchaseModel!.pizzaType,
			additionalIngredients: [],
		});

	const Price = ({ type }: { type: PizzaType }) => (
		<p>{`${price(type).toFixed(2)} zł`}</p>
	);

	const sizes = [
		{
			value: PizzaType.Small,
			label: 'Pizza 32 cm',
			child: <Price type={PizzaType.Small} />,
		},
		{
			value: PizzaType.Medium,
			label: 'Pizza 40 cm',
			child: <Price type={PizzaType.Medium} />,
		},
		{
			value: PizzaType.Large,
			label: 'Pizza 50 cm',
			child: <Price type={PizzaType.Large} />,
		},
	];

	const close = () => {
		updateApp('purchaseModel', undefined);
	};

	const addToBasket = () => {
		updateBasket(app!, updateApp, [
			{
				...app!.purchaseModel!,
				additionalIngredients: additionalIngredients.filter(
					(x) => (x.quantity ?? 0) > 0
				),
			},
			...snacks.filter((x) => (x.quantity ?? 0) > 0),
		]);

		close();
	};

	useEffect(() => {
		setSnacks(app!.snacks);
	}, [app!.snacks]);

	useEffect(() => {
		if (
			app!.purchaseModel &&
			app!.purchaseModel.additionalIngredients === undefined
		) {
			(async () => {
				const additionalIngredients = await get('ingredient');

				updateApp('purchaseModel', {
					...app!.purchaseModel!,
					additionalIngredients: additionalIngredients,
				});
			})();
		}
	}, [app!.purchaseModel]);

	if (!app!.purchaseModel) {
		return null;
	}

	const pizzaTypeIndex =
		pizzaType === PizzaType.Small ? 0 : pizzaType === PizzaType.Medium ? 1 : 2;

	const snacksPrice = sum(
		snacks
			.filter((x) => (x.quantity ?? 0) > 0)
			.map((x) => (x.price ?? 0) * (x.quantity ?? 0))
	);

	const increaseSnacks = (item: ProductModel) => {
		setSnacks((prev) =>
			prev.map((x) =>
				x.id === item.id ? { ...x, quantity: (x.quantity ?? 0) + 1 } : x
			)
		);
	};

	const decreaseSnacks = (item: ProductModel) => {
		setSnacks((prev) =>
			prev.map((x) =>
				x.id === item.id ? { ...x, quantity: (x.quantity ?? 0) - 1 } : x
			)
		);
	};

	return (
		<Modal
			className='items-start'
			open={app!.purchaseModel !== undefined}
			onClose={close}
		>
			<div className={styles['PurchaseDetailsModalView']}>
				<DialogHeader className='sticky top-0' onClose={close}>
					<p className='font-semibold text-[18px]'>{name}</p>
				</DialogHeader>
				<div>
					<img className='w-full' src={imageUrl ?? pizzaImg} />
					<Border />
					<div className='p-4'>
						<div className='flex justify-between'>
							<p className='font-semibold'>{name}</p>
							<p>{price().toFixed(2)} zł</p>
						</div>
						<Ingredients product={app!.purchaseModel!} />
					</div>
					<Border />
					<div className='p-4'>
						<ModalRadio
							childAlwaysVisible
							childRight
							captionBold
							caption='Rozmiar'
							options={sizes}
							onValueChange={(value) =>
								updateApp('purchaseModel', {
									...app!.purchaseModel!,
									pizzaType: value,
								})
							}
							selectedValue={pizzaType}
						/>
					</div>
					<div className='p-4'>
						{isMobile ? (
							<SnacksListSection
								snacks={snacks}
								onIncrease={increaseSnacks}
								onDecrease={decreaseSnacks}
							/>
						) : (
							<SnacksCarouselSection
								snacks={snacks}
								onIncrease={increaseSnacks}
								onDecrease={decreaseSnacks}
							/>
						)}
					</div>
				</div>
				<div className='px-4'>
					<p className='font-semibold'>Składniki</p>
					<ul className='flex flex-col gap-4 p-4'>
						{app!.purchaseModel!.ingredients?.map((item, key) => (
							<li key={key}>
								<Checkbox
									checked={!item.removed}
									children={<p>{item.name}</p>}
									onCheckChange={(checked) => {
										updateApp('purchaseModel', {
											...app!.purchaseModel!,
											ingredients: app!.purchaseModel!.ingredients!.map((x) =>
												x.id === item.id ? { ...x, removed: !checked } : x
											),
										});
									}}
								/>
							</li>
						))}
					</ul>
				</div>
				<div className='p-4'>
					<p className='font-semibold'>Dodatek do pizzy</p>
					<ul className='flex flex-col gap-4 mt-4 px-4'>
						{additionalIngredients.map((item, key) => (
							<li className='flex items-center gap-4' key={key}>
								<CounterSecond
									quantity={item.quantity}
									minValue={0}
									minValueVisilbe={false}
									onIncrease={() => {
										updateApp('purchaseModel', {
											...app!.purchaseModel!,
											additionalIngredients:
												app!.purchaseModel!.additionalIngredients!.map((x) =>
													x.id === item.id
														? { ...x, quantity: (x.quantity ?? 0) + 1 }
														: x
												),
										});
									}}
									onDecrease={() => {
										updateApp('purchaseModel', {
											...app!.purchaseModel!,
											additionalIngredients:
												app!.purchaseModel!.additionalIngredients!.map((x) =>
													x.id === item.id
														? { ...x, quantity: (x.quantity ?? 0) - 1 }
														: x
												),
										});
									}}
								/>
								<p>{item.name}</p>
								<p className='ml-auto'>{item.prices[pizzaTypeIndex]} zł</p>
							</li>
						))}
					</ul>
				</div>
				<div className='sticky bottom-0 z-10 flex justify-between gap-4 p-4 bg-[var(--color-fourth)]'>
					<CounterSecond
						quantity={quantity}
						onIncrease={() =>
							updateApp('purchaseModel', {
								...app!.purchaseModel!,
								quantity: quantity! + 1,
							})
						}
						onDecrease={() =>
							updateApp('purchaseModel', {
								...app!.purchaseModel!,
								quantity: quantity! - 1,
							})
						}
					/>
					<Button huge onClick={addToBasket}>
						Dodaj do koszyka +{' '}
						{(productToPrice(app!.purchaseModel) + snacksPrice).toFixed(2)} zł
					</Button>
				</div>
			</div>
		</Modal>
	);
};

export { PurchaseDetailsModalView };
