import '../styles/headerButton.scss';
import * as React from 'react';
import {useState} from 'react';

export const HeaderButton = ( {buttonText, value, onChange}) => {
	const [openDropDown,setOpenDropDown] = useState(false)
	const toggleDropdown = () => {
		setOpenDropDown(!openDropDown);
	};
	return (
		<>
			<div className="header-button-container">
		<button className="header__button"  onClick={toggleDropdown} >
			{buttonText} <img src="../pictures/arrow-down.svg"
			                  className={`arrow-icon ${openDropDown?'rotated':''}`}
		/>
		</button>
			{openDropDown && (
				<div className="button-dropdown">
					<div className="option">
						<div>
						<input type="radio" id={buttonText+'1'} name={buttonText+'1'} checked={value === buttonText+'1'} onChange={() => onChange(buttonText+'1')}/>
						<label htmlFor={buttonText+'1'} className="custom-checkbox small-text"></label>
					</div>
						<p>Да</p>
					</div>
					<div className="option">
						<div >
						<input type="radio" id={buttonText+'2'} name={buttonText+'2'} checked={value === buttonText+'2'} onChange={() => onChange(buttonText+'2')}/>
						<label htmlFor={buttonText+'2'}className="custom-checkbox small-text"></label>
						</div>
						<p>Нет</p>
					
					</div>
				</div>
			)}
			</div>
		</>
	);
};
