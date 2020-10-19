import React from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaCompass, FaBriefcase, FaUserFriends, FaUsers } from 'react-icons/fa';
import PropType from 'prop-types';
import queryString from 'query-string';
import { war } from '../utils/api';
import Cards from './cards';
import Loading from './loading';
import Tooltip from './tooltip'
import ToolTip from './tooltip';


function ProfileList({ profile }) {
    return (
        <ul className='card-list'>
            <li>
                <FaUser color='rgb(239, 115, 115)' size={22} />
                {profile.name}
            </li>
            {profile.location && (
                <ToolTip hoverText={'USer\'s location'}>
                    <li>
                        <FaCompass color='rgb(144, 115, 255)' size={22} />
                        {profile.location}
                    </li>
                </ToolTip>
            )}
            {profile.company && (
                <Tooltip hoverText={'User\'s company'}>
                    <li>
                        <FaBriefcase color='#795548' size={22} />
                        {profile.company}
                    </li>
                </Tooltip>
            )}
            <li>
                <FaUsers color='rgb(129, 195, 245)' size={22} />
                {profile.followers.toLocaleString()} followers
            </li>
            <li>
                <FaUserFriends color='rgb(64, 183, 95)' size={22} />
                {profile.following.toLocaleString()} following
            </li>
        </ul>
    )
}

ProfileList.propTypes = {
    profile: PropType.object.isRequired
}

export default class Results extends React.Component {

    state = {
        winner: null,
        loser: null,
        error: null,
        loading: true
    }

    componentDidMount() {
        const { playerOne, playerTwo } = queryString.parse(this.props.location.search);

        war([playerOne, playerTwo])
            .then((players) => {
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false
                })
            }).catch(({ message }) => {
                this.setState({
                    error: message,
                    loading: false
                })
            })
    }

    render() {
        const { winner, loser, loading, error } = this.state;

        if (loading === true) {
            return <Loading text='Battling' />
        }

        if (error) {
            return (
                <p className='center-text error'>
                    {error}
                </p>
            )
        }

        return (
            <React.Fragment>
                <div className='grid space-around container-sm'>
                    <Cards
                        header={winner.score === loser.score ? 'Tie' : 'Winner'}
                        subheader={`Score: ${winner.score.toLocaleString()}`}
                        avatar={winner.profile.avatar_url}
                        href={winner.profile.html_url}
                        name={winner.profile.login} >

                        <ProfileList profile={winner.profile} />
                    </Cards>
                    <Cards
                        header={winner.score === loser.score ? 'Tie' : 'loser'}
                        subheader={`Score: ${loser.score.toLocaleString()}`}
                        avatar={loser.profile.avatar_url}
                        href={loser.profile.html_url}
                        name={loser.profile.login}>

                        <ProfileList profile={loser.profile} />
                    </Cards>
                </div>
                <Link
                    className='btn btn-dark btn-space'
                    to='/war'
                >
                    Reset
                </Link>
            </React.Fragment>
        )
    }
}