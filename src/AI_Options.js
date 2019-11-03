import React from "react";
import { connect } from "react-redux";
import "./App.css";
import { promote, changePlayMode, PLAYER_VS_PLAYER, WHITE_VS_COMPUTER, BLACK_VS_COMPUTER } from "./store";
import { makeMove } from "./Game";

class AI_Options extends React.Component {
    constructor() {
        super();
        this.state = {
            selected: "q"
        };
        this.updateState = this.updateState.bind(this);
        this.submit = this.submit.bind(this);
    }

    updateState(event) {
        this.props.changePlayMode(event.target.value);
    }

    submit(event) {
        event.preventDefault();
        // const { from, to } = this.props.AI_Options;
        // this.props.promote(promote(from, to));
        // makeMove(from, to, this.state.selected);
    }

    render() {
        return (
            <div className='messageContainer'>
                <h3 className="header">Choose a Play Mode</h3>
                <div className='input-field'>
                    <select className='selectOption' name='selected' onChange={this.updateState}>
                        <option className="dropdown-content" value={PLAYER_VS_PLAYER}>Player VS Player</option>
                        <option className="dropdown-content" value={WHITE_VS_COMPUTER}>Play as White VS Computer</option>
                        <option className="dropdown-content" value={BLACK_VS_COMPUTER}>Play as Black VS Computer</option>
                    </select>
                </div>
                {/* <button onClick={this.submit}>Submit</button> */}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    AI_Options: state.AI_Options
});

const mapDispatchToProps = dispatch => ({
    promote: (from, to) => dispatch(promote(from, to)),
    changePlayMode: value => dispatch(changePlayMode(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AI_Options);

