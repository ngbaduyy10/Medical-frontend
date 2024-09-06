import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

function Unauthorized () {
    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={
                <Link to="/login">
                    <Button type="primary">Back to Login</Button>
                </Link>
            }
        />
    )
}

export default Unauthorized;