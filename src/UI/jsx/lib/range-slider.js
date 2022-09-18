import React, {useState, useEffect} from "react";


export class RangeSlider extends React.Component {


    constructor(props) {
        super(props); 
        this.state = {
        value: this.props.value
        };

        this.onChange = this.onChange.bind(this);
    }

    updateProgress(el){
        const value = el.value;
        const progress = (((value - this.props.min) / (this.props.max - this.props.min)) * ((el.offsetWidth - 5) - 5)) + 5;
        el.nextElementSibling.style.width = progress + 'px';
    }

    onChange(event) {
        this.updateProgress(event.target);
        this.setState({value: event.target.value});
        this.props.onChange(event.target.value);
    }

    componentDidMount() {
        this.updateProgress(this._input);
    }

    render() {  
        return (
            <div className='rangeContainer'>
                <input type="range" min={this.props.min} max={this.props.max} className='rangeSlider' value={this.state.value} onChange={this.onChange} ref={(ref) => this._input = ref}/>
                <div className="rangeProgress"></div>
                
            </div>
        ); 
    }
}
