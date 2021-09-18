import { Link } from 'react-router-dom'
import classes from './Success.module.css'

const Success = () => {
    return (
        <div className={classes.container}>
            <div className={classes.form}>
            <div style={{marginBottom: '3rem'}}>
                <h4>Great!</h4>
                <p>You have successfully subscribed, You app will be ready in few days!</p>
            </div>
            <div>
                <Link to="/" className={classes.button}>Back to Home</Link>
            </div>
            </div>
        </div>
    )
}

export default Success