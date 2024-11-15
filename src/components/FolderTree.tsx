import Tree from 'rc-tree';
import * as React from 'react';
import {useState} from 'react';
import {node} from 'globals';

type FolderTreeProps = {
	data: TreeNode[];
	onChange: (description: any) => void; 	value: string;
};
type TreeNode = Array<{ name: string; id: string; children: TreeNode }>;

export const FolderTree: React.FC<FolderTreeProps> = (props) => {
	const [treeValue, setTreeValue] = useState<string | null>(null);
	
	function findDescription(obj, nodeId) {
		console.log(obj, nodeId);
		for (let i of obj) {
			if (i.id === nodeId) {
				return i;
			} else if (i.children) {
				const found = findDescription(i.children, nodeId);
				if (found) {
					return found;
				}
			}
		}
		return null;
	}
	
	const tree = (props.data || []) as TreeNode;
	const renderData = treeMap(tree);
	
	const [expandedKeys, setExpandedKeys] = React.useState<string[]>([]);
	
	function treeMap(tree: TreeNode) {
		if (!tree) return;
		return tree.map((el) => ({
			title: el.name,
			key: el.id,
			children: treeMap(el.children),
		}));
	}
	
	const handleExpandAll = () => {
		const allKeys = getAllKeys(renderData);
		setExpandedKeys(allKeys);
	};
	
	const handleCollapseAll = () => {
		setExpandedKeys([]);
	};
	
	const getAllKeys = (nodes: any[]): string[] => {
		let keys: string[] = [];
		nodes.forEach((node) => {
			keys.push(node.key);
			if (node.children) {
				keys = keys.concat(getAllKeys(node.children));
			}
		});
		return keys;
	};
	
	const [chosenNode, setChosenNode] = useState(null);
	const SwitcherIcon: React.FC<any> = (switcherProps) => {
		const handleNodeClick = () => {
			setTreeValue(switcherProps.data.key);
			let found = findDescription(props.data, switcherProps.data.key);
			props.onChange(found);
		};
		
		return (
			<div className="switcher">
				<button className={`switcher-icon`}>
					<img src="/pictures/arrow-down.svg"/>
				</button>
				<span className="">
					<input type="radio" name="treeNode" id={'title-' + switcherProps.data.key} onChange={handleNodeClick}
					       checked={props.value === findDescription(props.data, switcherProps.data.key)?.description}
					       className="switcher-input"/>
					<label htmlFor={'title-' + switcherProps.data.key} className="custom-checkbox"></label>
				</span>
			</div>
		);
	};
	
	const titleRender = (node: any) => {
		const handleNodeClick = () => {
			setTreeValue(node.key);
			let found = findDescription(props.data, node.key);
			props.onChange(found);
		};
		
		return (
			<span onClick={() => handleNodeClick()}>{node.title}</span>
		);
	};
	
	return (
		<>
			<div className="main__left__buttons">
				<button onClick={handleCollapseAll} className="main__left__buttons__left">
					Свернуть все
				</button>
				<button onClick={handleExpandAll} className="main__left__buttons__right">
					Развернуть все
				</button>
			</div>
			<Tree
				showLine
				checkable
				selectable={false}
				expandedKeys={expandedKeys}
				onExpand={(keys) => setExpandedKeys(keys as string[])}
				expandAction="doubleClick"
				treeData={renderData}
				switcherIcon={SwitcherIcon}
				titleRender={titleRender}
			/>
		</>
	);
};
