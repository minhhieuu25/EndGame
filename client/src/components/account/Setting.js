import React from 'react';

const Setting = () => {
    return (
        <div className="col-xl-8 order-xl-1" style={{margin:'20px auto'}}>
            <div className="card">
                <div className="card-header">
                    <div className="row align-items-center">
                        <div className="col-8">
                            <h3 className="mb-0">Edit profile </h3>
                        </div>
                        <div className="col-4 text-right">
                            <a href="#!" className="btn btn-sm btn-primary">Settings</a>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <form>
                        <h6 className="heading-small text-muted mb-4">User information</h6>
                        <div className="pl-lg-4">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="input-username">Username</label>
                                        <input type="text" id="input-username" className="form-control" placeholder="Username" defaultValue="lucky.jesse" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="input-email">Email address</label>
                                        <input type="email" id="input-email" className="form-control" placeholder="jesse@example.com" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="input-first-name">First name</label>
                                        <input type="text" id="input-first-name" className="form-control" placeholder="First name" defaultValue="Lucky" />
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="input-last-name">Last name</label>
                                        <input type="text" id="input-last-name" className="form-control" placeholder="Last name" defaultValue="Jesse" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4" />
                        {/* Address */}
                        <h6 className="heading-small text-muted mb-4">Contact information</h6>
                        <div className="pl-lg-4">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="input-address">Address</label>
                                        <input id="input-address" className="form-control" placeholder="Home Address" defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" type="text" />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="input-city">City</label>
                                        <input type="text" id="input-city" className="form-control" placeholder="City" defaultValue="New York" />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="input-country">Country</label>
                                        <input type="text" id="input-country" className="form-control" placeholder="Country" defaultValue="United States" />
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <div className="form-group">
                                        <label className="form-control-label" htmlFor="input-country">Postal code</label>
                                        <input type="number" id="input-postal-code" className="form-control" placeholder="Postal code" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-4" />
                        {/* Description */}
                        <h6 className="heading-small text-muted mb-4">About me</h6>
                        <div className="pl-lg-4">
                            <div className="form-group">
                                <label className="form-control-label">About Me</label>
                                <textarea rows={4} className="form-control" placeholder="A few words about you ..." defaultValue={"A beautiful Dashboard for Bootstrap 4. It is Free and Open Source."} />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Setting;