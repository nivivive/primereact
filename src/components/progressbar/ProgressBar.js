import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class ProgressBar extends Component {

    static defaultProps = {
        id: null,
        showValue: true,
        unit: '%',
        style: null,
        className: null,
        mode: 'determinate'
    }

    static propTypes = {
        id: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        showValue: PropTypes.bool,
        displayValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        unit: PropTypes.string,
        style: PropTypes.object,
        className: PropTypes.string,
        mode: PropTypes.string
    };

    renderLabel() {
        if (this.props.showValue && 'displayValue' in this.props) {
            return (
                <div className="p-progressbar-label">{this.props.displayValue}</div>
            );
        }
        else if (this.props.showValue && 'value' in this.props) {
            return (
                <div className="p-progressbar-label">{this.props.value + this.props.unit}</div>
            );
        }
        else {
            return null;
        }
    }

    renderDeterminate() {
        let className = classNames('p-progressbar p-component p-progressbar-determinate', this.props.className);
        let label = this.renderLabel();

        return (
            <div  role="progressbar" id={this.props.id} className={className} style={this.props.style} aria-valuemin="0" aria-valuenow={this.props.value} aria-valuemax="100" aria-label={this.props.value}>
                <div className="p-progressbar-value p-progressbar-value-animate" style={{width: this.props.value + '%', display: 'block'}}></div>
                {label}
            </div>
        );
    }

    renderIndeterminate() {
        let className = classNames('p-progressbar p-component p-progressbar-indeterminate', this.props.className);

        return (
            <div role="progressbar" id={this.props.id} className={className} style={this.props.style}>
                <div className="p-progressbar-indeterminate-container">
                    <div className="p-progressbar-value p-progressbar-value-animate"></div>
                </div>
            </div>
        )
    }

    render() {
        if (this.props.mode === 'determinate')
            return this.renderDeterminate();
        else if (this.props.mode === 'indeterminate')
            return this.renderIndeterminate();
        else
            throw new Error(this.props.mode + " is not a valid mode for the ProgressBar. Valid values are 'determinate' and 'indeterminate'");
    }

}