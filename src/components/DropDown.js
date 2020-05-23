import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react';

export class DropDown extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="dropdown-menu">
                <h5 className="ui header left aligned">Select Category</h5>
                <Dropdown fluid selection placeholder="Any Category" onChange={(e, { value }) => this.props.getDropdown(value, e.target.textContent)} options={[
                    { key: 1, text: 'Random Category', value: '', icon: 'random' },
                    { key: 2, text: 'General Knowledge', value: 9 },
                    <Dropdown.Divider key={26} />,
                    { key: 29, text: 'Entertainment', value: '', icon: 'film' },
                    { key: 3, text: 'Books', value: 10, as: 'li' },
                    { key: 4, text: 'Film', value: 11, as: 'li' },
                    { key: 5, text: 'Music', value: 12, as: 'li' },
                    { key: 6, text: 'Musicals & Theatres', value: 13, as: 'li' },
                    { key: 7, text: 'Television', value: 14, as: 'li' },
                    { key: 8, text: 'Video Games', value: 15, as: 'li' },
                    { key: 9, text: 'Board Games', value: 16, as: 'li' },
                    { key: 22, text: 'Comics', value: 29, as: 'li' },
                    { key: 24, text: 'Japanese Anime & Manga', value: 31, as: 'li' },
                    { key: 25, text: 'Cartoon & Animations', value: 32, as: 'li' },
                    <Dropdown.Divider key={27} />,
                    { key: 30, text: 'Science', value: '', icon: 'flask' },
                    { key: 10, text: 'Science & Nature', value: 17, as: 'li' },
                    { key: 11, text: 'Computers', value: 18, as: 'li' },
                    { key: 12, text: 'Mathematics', value: 19, as: 'li' },
                    { key: 23, text: 'Gadgets', value: 30, as: 'li' },
                    <Dropdown.Divider key={28} />,
                    { key: 31, text: 'Miscellaneous', value: '', icon: 'balance scale' },
                    { key: 13, text: 'Mythology', value: 20, as: 'li' },
                    { key: 14, text: 'Sports', value: 21, as: 'li' },
                    { key: 15, text: 'Geography', value: 22, as: 'li' },
                    { key: 16, text: 'History', value: 23, as: 'li' },
                    { key: 17, text: 'Politics', value: 24, as: 'li' },
                    { key: 18, text: 'Art', value: 25, as: 'li' },
                    { key: 19, text: 'Celebrities', value: 26, as: 'li' },
                    { key: 20, text: 'Animals', value: 27, as: 'li' },
                    { key: 21, text: 'Vehicles', value: 28, as: 'li' },
                ]} as='ul' />
                <h5 className="ui header left aligned">Select Type</h5>
                <Dropdown fluid selection placeholder="Any Type" onChange={(e, { value }) => this.props.getType(value, e.target.textContent)} options={[
                    { key: 1, text: 'Random Type', value: '', icon: 'random' },
                    { key: 2, text: 'Multiple Choice', value: 'multiple' },
                    { key: 3, text: 'True / False', value: 'boolean' },
                ]} as='ul' />
            </div>
        )
    }
}

export default DropDown