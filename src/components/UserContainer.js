import React from 'react';
import PropTypes from 'prop-types'

export const UserContainer = (props) => {
    const { attributes } = props.user;
    const { name, id, email } = attributes;

    return (
        <button className={"bg-gray-100 bg-opacity-60 border border-gray-100 rounded-xl hover:border-gray-500  focus:bg-gray-200 focus:border-opacity-0"}>
            <figure className={'rounded-xl'} >
                <img className="rounded-full mx-auto" src={"https://i.pravatar.cc/150?u=" + id} alt="" />
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
