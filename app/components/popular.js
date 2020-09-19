import React from 'react';


class Popular extends React.Component {
    render() {

        const languages = ['All', 'Javascript', 'Java', 'Python', 'CSS', 'Ruby'];

        return (
            <ul className="flex-center">
                {languages.map((language, index) => (
                    <li key={language}>
                        <button className="btn-clear nav-link">
                            {language}
                        </button>
                    </li>
                ))}
            </ul>
        )
    }
}

export default Popular;