import React from "react";

class TopHouses extends React.Component {


    render() {
        return (
            <section className="alternate">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <h3 style={{ color: "#3f51b5" }}>Top houses</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-1">
                            <hr style={{marginTop: "-2px"}}/>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

}

export default TopHouses;