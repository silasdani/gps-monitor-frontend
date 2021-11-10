import React from 'react';
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react';

export const UserContainer = (props) => {
    const { attributes } = props.user;
    const { name, id, email } = attributes;

    return (
        <button className={`bg-gray-100 min-h-32 max-w-32 rounded-xl z-40 focus:ring-blue-600`}>
            <figure className={'rounded-xl'} >
                <img className="w-32 h-32 rounded-full mx-auto" src={"https://i.pravatar.cc/150?u=" + id} alt="" width="384" height="512" />
                <div className="pt-6 text-center space-y-4">
                    <blockquote>
                        <p className="text-lg font-semibold">
                            #{id}
                        </p>
                    </blockquote>
                    <figcaption className="font-medium">
                        <div className="text-cyan-600">
                            {email}
                        </div>
                        <div className="text-gray-500">
                            {name}
                        </div>
                        <a className="text-red-600" href={"/users/edit/" + id} />
                    </figcaption>
                </div>
            </figure>
        </button>
    )
}

UserContainer.propTypes = {
    user: PropTypes.object.isRequired,
}
