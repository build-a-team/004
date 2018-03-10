import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styles from "./MainPage.scss";
import classNames from "classnames/bind";
import BottomNav from "components/BottomNav";
import Cards from 'components/SwipeCard/Cards';
import Card from 'components/SwipeCard/CardSwitcher';
import { log } from 'ruucm-util';


const cx = classNames.bind(styles);


const data = ['Alexandre', 'Thomas', 'Lucien']
const CustomAlertLeft = () => {
	return <span>Nop</span>
}
const CustomAlertRight = () => <span>Ok</span>

class MainPage extends Component {
	action(name) {
        console.log(name);
    }
    render() {
        return (
            <div className={cx("main-page")}>
            	<nav className={cx("main-nav")}>
            		<button className="hash-tag">#해시태그</button>
            		<button className="hash-tag">#해시태그</button>
            		<button className="show-result"><Link to="/vote-result">결과보기</Link></button>
            	</nav>
                <div>
				  <h1>react swipe card</h1>
				  <Cards
				    alertRight={<CustomAlertRight />} 
				    alertLeft={<CustomAlertLeft />} 
				    onEnd={this.action('end')}
				    className='master-root'>
				    {data.map((item, key) => 
				      <Card
				          key={key}
				          onSwipeLeft={()=>{this.action('swipe left!!!!!')}}
				          onSwipeRight={()=>{this.action('swipe right!!!!')}}>
				        <h2>{item}</h2>
				      </Card>
				    )}
				  </Cards>
				</div>
                <div className="row select-btns-wrapper">
				  <div className="col-6">
				  	<button>스투핏</button>
				  </div>
				  <div className="col-6">
				  	<button>그뤠잇</button>
				  </div>
				</div>
				<BottomNav></BottomNav>
            </div>
        );
    }
}

export default MainPage;
