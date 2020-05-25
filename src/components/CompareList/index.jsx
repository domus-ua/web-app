import React from "react";

class CompareList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            houses: []
        }

        this.removeHouse = this.removeHouse.bind(this);
        this.checkHouseList = this.checkHouseList.bind(this);
    }

    checkHouseList() {
        setInterval(() => {
            const currentHouses = JSON.parse(localStorage.getItem('houseComparison'));
            if (currentHouses !== null && currentHouses.length !== this.state.houses.length) {
                this.setState({
                    houses: currentHouses
                })
            }
        }, 1000);
    }

    componentDidMount() {
        this.checkHouseList();
    }

    removeHouse(id) {
        let houseList = JSON.parse(localStorage.getItem('houseComparison'));
        let newHouseList = [];
        houseList.forEach((house) => {
            if (house.id !== id) {
                newHouseList.push({ id: house.id, title: house.title });
            }
        })


        localStorage.setItem('houseComparison', JSON.stringify(newHouseList));

        this.setState({
            houses: newHouseList
        })

    }

    render() {
        return (
            <>
                {this.state.houses.length !== 0 &&
                    <div id="compare-list" className="compare-list">
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12 text-center">
                                    COMPARE LIST
                            </div>
                                <div className="row">
                                    <div className="col-sm-12">
                                        <ul>
                                            {this.state.houses.map((house => {
                                                return <li onClick={() => this.removeHouse(house.id)}><i className="fas fa-times"></i> {house.title}</li>
                                            }))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }

}

export default CompareList;