import React, { useState, useRef, useEffect } from 'react';

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
	ArticleStateType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	onChange: (articleFormState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ onChange }: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [articleFormState, setArticleFormState] = useState(defaultArticleState);
	const sidebarRef = useRef<HTMLDivElement | null>(null);

	const handleApply = (event: React.FormEvent) => {
		event.preventDefault();
		onChange(articleFormState);
	};

	const handleReset = (event: React.FormEvent) => {
		event.preventDefault();
		setArticleFormState(defaultArticleState);
		onChange(defaultArticleState);
	};

	const toggleState = () => {
		setIsOpen((prev) => !prev);
	};

	const handleInputChange = <T extends keyof ArticleStateType>(
		key: T,
		value: ArticleStateType[T]
	) => {
		setArticleFormState((prev) => ({ ...prev, [key]: value }));
	};

	useEffect(() => {  
		const handleClickOutside = (event: MouseEvent) => {  
			if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {  
				setIsOpen(false);  
			}  
		};  

		if (isOpen) {  
			window.addEventListener('mousedown', handleClickOutside);  
		} else {  
			window.removeEventListener('mousedown', handleClickOutside);  
		}  

		return () => {  
			window.removeEventListener('mousedown', handleClickOutside);  
		};  
	}, [isOpen]); 

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleState} />
			<aside
				ref={sidebarRef}
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
