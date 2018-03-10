import React, { Component } from "react";
import styles from "./BottomNav.scss";
import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

const linkStyles = {
	link: {
			display: 'block',
			fontFamily: 'Gotham',
			fontSize: 32,
			fontWeight: 'bold',
			fontStyle: 'normal',
			letterSpacing:' -0.5px',
			textAlign: 'center',
			textDecoration: 'none',
		  },
}
const LinkText = [
	{
	  tabName: 'Select',
	  idx: 0,
	  path: "/"
	},
	{
		tabName: 'Feed',
		idx: 1,
		path: "/feed"
	},
	{
		tabName: 'Upload',
		idx: 2,
		path: "/upload"
	},
	{
		tabName: 'My',
		idx: 3,
		path: "/my-page"
	},
];

class BottomNav extends Component {
	constructor(props){
		super(props);
		this.state = {
			currentIdx: this.props.currentIdxs,
		}
	}
    render() {
        return (
            <div className={cx("bottom-nav")}>
				<div className="row nav-btns-wrapper">
					{LinkText.map(link => {
						return (
						<div className="col-3 link-container">
							<Link 
								key={`link-${link.path}`}
								to={link.path} 
								style={{
									color: this.state.currentIdx === link.idx ? '#1d20ff' : '#d8d8d8', 
									borderTop: `2px solid ${this.state.currentIdx === link.idx ? '#1d20ff' : 'transparent'}`, 									
									...linkStyles.link,
								}}
							>
							{link.tabName}
							</Link>
						</div>
						)
					 })
					}
				</div>
            </div>
        );
    }
}



export default BottomNav;

