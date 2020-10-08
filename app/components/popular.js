import PropTypes from 'prop-types';
import React from 'react';
// Font Awesome
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa';
import { fetchPopulaRepos } from '../utils/api';
import Cards from './cards';
import Loading from './loading';
import ToolTip from './tooltip';


function LanguagesNav({ selected, onUpdateLanguage }) {
    const languages = ['All', 'Javascript', 'Java', 'Python', 'CSS', 'Ruby'];

    return (
        <ul className="flex-center">
            {languages.map((language, index) => (
                <li key={index}>
                    <button className="btn-clear nav-link"
                        style={language === selected ? { color: 'rgb(179, 0, 0)' } : null}
                        onClick={() => onUpdateLanguage(language)}>
                        {language}
                    </button>
                </li>
            ))}
        </ul>
    )
}

LanguagesNav.propTypes = {
    selected: PropTypes.string.isRequired,
    onUpdateLanguage: PropTypes.func.isRequired
}

function ReposGrid({ repos }) {
    return (
        <ul className='grid space-around'>
            {
                repos.map((repo, index) => {
                    const { name, owner, html_url, stargazers_count, forks, open_issues } = repo;
                    const { login, avatar_url } = owner;

                    return (
                        <li key={html_url}>
                            <Cards
                                header={`#${index + 1}`}
                                avatar={avatar_url}
                                href={html_url}
                                name={login}>

                                <ul className='card-list'>
                                    <li>
                                        <ToolTip hoverText={'Github username'}>
                                            <FaUser color='rgb(255,191,116)' size={22} />
                                            <a href={`https://github.com/${login}`}> {login} </a>
                                        </ToolTip>
                                    </li>
                                    <li>
                                        <FaStar color='rgb(255,215,0)' size={22} />
                                        {stargazers_count.toLocaleString()} stars
                                </li>
                                    <li>
                                        <FaCodeBranch color='rgb(129, 195, 245)' size={22} />
                                        {forks.toLocaleString()} forks
                                </li>
                                    <li>
                                        <FaExclamationTriangle color='rgb(241,138,147)' size={22} />
                                        {open_issues.toLocaleString()} open issues
                                </li>
                                </ul>
                            </Cards>
                        </li>
                    )
                })
            }
        </ul>
    )
}

ReposGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

class Popular extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedLanguage: 'All',
            repos: {},
            error: null
        }

        this.updateLanguageSelection = this.updateLanguageSelection.bind(this);
        this.isLoading = this.isLoading.bind(this);
    }

    componentDidMount() {
        this.updateLanguageSelection(this.state.selectedLanguage);
    }

    updateLanguageSelection(selectedLanguage) {
        this.setState({
            selectedLanguage,
            error: null
        });

        if (!this.state.repos[selectedLanguage]) {

            fetchPopulaRepos(selectedLanguage)
                .then((data) => {
                    this.setState(({ repos }) => ({
                        repos: {
                            ...repos,
                            [selectedLanguage]: data
                        }
                    }))
                })
                .catch((e) => {
                    console.warn('Error fetching repos', e);

                    this.setState({
                        error: 'Unable to fetch repos due to error'
                    })
                })
        }
    }

    isLoading() {
        const { selectedLanguage, repos, error } = this.state;
        return !repos[selectedLanguage] && error === null
    }

    render() {
        const { selectedLanguage, repos, error } = this.state;
        return (
            <React.Fragment>
                <LanguagesNav
                    selected={selectedLanguage}
                    onUpdateLanguage={this.updateLanguageSelection}
                />

                {this.isLoading() && <p> <Loading text='Fetching Repos' /></p>}

                {error && <p className='center-text error'>{error}</p>}

                {repos[selectedLanguage] && <ReposGrid repos={repos[selectedLanguage]} />}

            </React.Fragment>
        )
    }
}

export default Popular;