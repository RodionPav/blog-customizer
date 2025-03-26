import React, { useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import { Select } from 'src/ui/select';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import {
	defaultArticleState,
	fontFamilyOptions,
	contentWidthArr,
	fontColors,
	backgroundColors,
	fontSizeOptions,
} from 'src/constants/articleProps';

type ArticleParamsFormProps = {
	onChange: (articleFormState: any) => void;
};

export const ArticleParamsForm = ({ onChange }: ArticleParamsFormProps) => {
	const [initialState] = useState(defaultArticleState);
	const [isOpen, setIsOpen] = useState(false);
	const [articleFormState, setArticleFormState] = useState(initialState);

	const handleApply = (event: React.FormEvent) => {
		event.preventDefault();
		onChange(articleFormState);
	};

	const handleReset = (event: React.FormEvent) => {
		event.preventDefault();
		onChange(defaultArticleState);
		setArticleFormState(initialState);
	};

	const toggleState = () => {
		setIsOpen((prev) => !prev);
	};

	const handleInputChange = (key: string, value: any) => {
		setArticleFormState((prev) => ({ ...prev, [key]: value }));
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleState} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleApply}
					onReset={handleReset}>
					<Text as='h2' weight={800} size={31} uppercase>
						Задайте Параметры
					</Text>
					<Select
						title='ШРИФТ'
						options={fontFamilyOptions}
						onChange={(option) => handleInputChange('fontFamilyOption', option)}
						selected={articleFormState.fontFamilyOption}
					/>
					<RadioGroup
						title='РАЗМЕР ШРИФТА'
						name='fonSize'
						onChange={(option) => handleInputChange('fontSizeOption', option)}
						selected={articleFormState.fontSizeOption}
						options={fontSizeOptions}
					/>
					<Select
						title='ЦВЕТ ШРИФТА'
						onChange={(option) => handleInputChange('fontColor', option)}
						options={fontColors}
						selected={articleFormState.fontColor}
					/>
					<Separator />
					<Select
						title='ЦВЕТ ФОНА'
						selected={articleFormState.backgroundColor}
						onChange={(option) => handleInputChange('backgroundColor', option)}
						options={backgroundColors}
					/>
					<Select
						title='ШИРИНА КОНТЕНТА'
						selected={articleFormState.contentWidth}
						onChange={(option) => handleInputChange('contentWidth', option)}
						options={contentWidthArr}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
