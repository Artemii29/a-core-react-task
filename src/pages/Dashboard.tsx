import * as React from 'react';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import '../styles/customTreeStyles.scss';
import '../styles/dashboard.scss';
import {ApolloClient, gql, useQuery, InMemoryCache} from '@apollo/client';
import {IconType} from 'rc-tree/es/interface';
import {FolderTree} from '../components/FolderTree.tsx';
import {useState} from 'react';
import {HeaderButton} from '../components/HeaderButton';

const GET_OBJECT_TREE = gql`
  query Tree {
    modelTreeClasses {
      tree {
        sort
        name
        id
        description
        children {
          name
          id
          description
          children {
            name
            id
            description
            children {
              name
              id
              description
              children {
                name
                description
                id
              }
            }
          }
        }
      }
    }
  }
`;

const Dashboard: React.FC = () => {
	const {loading, error, data} = useQuery(GET_OBJECT_TREE);
	const [description, setDescription] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [assignedFilter, setAssignedFilter] = useState('');
	const [libraryFilter, setLibraryFilter] = useState('');
	console.log(assignedFilter);
	
	function onCheckboxChange(updateFunction) {
		return (evt) => {
			console.log(evt);
			updateFunction(evt);
		};
	}
	
	const searchInput = (event) => {
		const searchText = event.target.value;
		setSearchValue(searchText);
	};
	
	const filteredTree = searchValue ? fastSearch(searchValue, data?.modelTreeClasses?.tree || []) : data?.modelTreeClasses?.tree || [];
	
	
	function fastSearch(name, array) {
		return array
			.map((item) => {
				if (item.name.toLowerCase().includes(name.toLowerCase())) {
					return {...item};
				}
				const childrenFound = fastSearch(name, item.children || []);
				if (childrenFound.length) {
					return {...item, children: childrenFound};
				}
				return null;
			})
			.filter(Boolean);
	};
	
	
	const changeDescription = (data: any) => {
		setDescription(data ? data.description : '');
	};
	
	console.log(filteredTree, data);
	
	return (
		<>
			<div className="container">
				<div className="header">
					<p className="header__logo">Классы</p>
					<div className="header__right">
						<HeaderButton buttonText="Присвоенные +1" value={assignedFilter}
						              onChange={onCheckboxChange(setAssignedFilter)} />
						<HeaderButton buttonText="В библиотеке +1 " value={libraryFilter}
						              onChange={onCheckboxChange(setLibraryFilter)} />
						
						
						<div className="header__text__input">
							<img src="../pictures/searchIcon.svg"/>
							<input type="text" placeholder="Найти классы" onChange={searchInput} value={searchValue}/>
						
						</div>
					</div>
				</div>
			</div>
			<div className="container">
				<div className="main">
					<div className="main__left">
						
						<FolderTree
							data={searchValue ? filteredTree : data?.modelTreeClasses?.tree || []}
							onChange={changeDescription}
							value={description}
						/></div>
					<div className="main__right">
						<div className="main__right__description">
							<p className="label__description">Описание</p>
							<p className="main__right__input">{description}</p>
						</div>
						<div className="main__right__properties">
							<p className="main__right__properties__header">Свойства</p>
							<div className="main__right__properties__head">
								<h3 className="main__right__properties__head__name">Название</h3>
								<div className="main__right__properties__head__right">
									<h3 className="main__right__column__item__right__first comlumn__item__text">Значение по умолчанию</h3>
									<h3 className="main__right__column__item__right__second">Единица измерения</h3>
								
								</div>
							</div>
							<div className="main__right__column">
								<div className="main__right__column__item">
									<p>Давление номинальное</p>
									<div className="main__right__column__item__right">
										<p className="main__right__column__item__right__first">2,5</p>
										<p className="main__right__column__item__right__second">МПа</p>
									</div>
								</div>
								<div className="main__right__column__item">
									<p>Пожаробезопасный</p>
									<div className="main__right__column__item__right">
										<p className="main__right__column__item__right__first">2,5</p>
										<p className="main__right__column__item__right__second">МПа</p>
									</div>
								</div>
								<div className="main__right__column__item">
									<p>Температура среды</p>
									<div className="main__right__column__item__right">
										<p className="main__right__column__item__right__first">2,5</p>
										<p className="main__right__column__item__right__second">МПа</p>
									</div>
								</div>
								<div className="main__right__column__item">
									<p>Функциональный признак прибора</p>
									<div className="main__right__column__item__right">
										<p className="main__right__column__item__right__first">2,5</p>
										<p className="main__right__column__item__right__second">МПа</p>
									</div>
								</div>
							</div>
						</div>
						<div>
							<div>
							</div>
						</div>
						<div className="main__right__footer">
							<p className="main__right__footer__logo">Связи</p>
							<div className="main__right__footer__head">
								<input type="checkbox"/>
								<label htmlFor="" className="custom-checkbox"></label>
								<h3>Название класса</h3>
							</div>
							<div className="main__right__footer__column">
								<div className="main__right__footer__column__item">
									<input type="checkbox"/>
									<label htmlFor="" className="custom-checkbox"></label>
									<p>Механическое оборудование</p>
								</div>
								<div className="main__right__footer__column__item">
									<input type="checkbox" id="title"/>
									<label htmlFor="title" className="custom-checkbox"></label>
									
									<p>Титул</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Dashboard;
