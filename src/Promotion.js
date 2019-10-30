import React from "react";
import { connect } from "react-redux";
import "./App.css"
import { promotionChoice, promote } from './store'

class Promotion extends React.Component {
    constructor(){
        super()
        this.state = {
            selected: ""
        }
        this.updateState = this.updateState.bind(this)
        this.submit = this.submit.bind(this)
    }

    updateState(event){
        console.log(event)
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    submit(event){
        event.preventDefault()
        this.props.setPromotionValue(this.state.selected)
        this.props.promote(promote())
    }

    render(){
        if (!this.props.promotion.popUp){
            return <div></div>
        }
        return (
            <div>
                <h3>Choose a Pomotion</h3>
                <form>
                    <ul>
                        <li className='input-field' >
                            <div>
                                <label>Promotion</label>
                                <select defaultValue={'default'} id='selectPromotion' className='browser-default' name='selected' onChange={this.updateState}>
                                    <option disabled value='default'>Choose a Promotion</option>
                                    <option value="q">queen</option>
                                    <option value="n">knight</option>
                                    <option value="b">bishop</option>
                                    <option value="r">rook</option>
                                </select>
                            </div>
                        </li>
                        <li>
                            <button className='waves-effect waves-light btn-large' onClick={this.submit}>Submit</button>
                        </li>
                    </ul>
                </form>
            </div>
        )
    } 
}

const mapStateToProps = state => ({
    promotion: state.promotion
});

const mapDispatchToProps = dispatch => ({
    setPromotionValue: (value) => dispatch(promotionChoice(value)),
    promote: () => dispatch(promote())
})

export default connect(mapStateToProps, mapDispatchToProps)(Promotion);

