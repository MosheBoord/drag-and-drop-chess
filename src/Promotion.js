import React from "react";
import { connect } from "react-redux";
import "./App.css";
import { promote } from "./store";
import { makeMove } from "./Game";

class Promotion extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: ""
        };
        this.updateState = this.updateState.bind(this);
        this.submit = this.submit.bind(this);
    }

    updateState(event) {
        console.log(event);
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    submit(event) {
        event.preventDefault();
        const { from, to } = this.props.promotion;
        this.props.promote(promote(from, to));
        makeMove(from, to, this.state.selected);
    }

    render() {
        if (!this.props.promotion.popUp) {
            return <div></div>;
        }
        return (
            <div className='promotionDialog'>
                <h3 className="header">Choose a Promotion</h3>
                    <div className='input-field'>
                        <select id='selectPromotion' name='selected' onChange={this.updateState}>
                            <option className="dropdown-content" value="q">queen</option>
                            <option className="dropdown-content" value="n">knight</option>
                            <option className="dropdown-content" value="b">bishop</option>
                            <option className="dropdown-content" value="r">rook</option>
                        </select>
                    </div>
                    <button onClick={this.submit}>Submit</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    promotion: state.promotion
});

const mapDispatchToProps = dispatch => ({
    promote: (from, to) => dispatch(promote(from, to))
});

export default connect(mapStateToProps, mapDispatchToProps)(Promotion);

