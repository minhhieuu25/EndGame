import React from 'react';
import { Link } from 'react-router-dom';
import './Evaluate.scss';

const Evaluate = () => {
    return (
        <div className="evaluate mt-5 mb-5">
            <div className="container">
                <h2 className="text-center">Candidates Say About RankWork</h2>
                <h2 className="text-center text-2"></h2>
                <div id="carouselEvaluate" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active row no-gutters">
                            <div className="row evaluate-card">
                                <div className="col-sm-4">
                                    <div className="card border-info mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">Lê Hữu Hoàng Long</h5>
                                            <p className="card-text text-secondary">Tôi có ấn tượng mạnh với CV ứng viên được gửi từ RankWork. CV trình bày rất rõ ràng, bắt mắt, giúp tôi thấy ngay được điểm mạnh của từng ứng viên. Nhờ đó mà công tác Tuyển dụng cũng thuận lợi hơn.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="card border-info mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">Đặng Minh Hiếu</h5>
                                            <p className="card-text text-secondary">RankWork là một ý tưởng rất sáng tạo và thực tế. Tôi đã chỉnh sửa CV của mình tốt lên hơn rất nhiều từ những mẫu tham khảo trên trang web.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="card border-info mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">Trần Văn Lực</h5>
                                            <p className="card-text text-secondary">Tôi có kinh nghiệm 10 năm trong việc quản lý, tuy nhiên đến giờ CV nhìn vẫn không chuyên nghiệp. RankWork đã giúp tôi có CV chuẩn và chuyên nghiệp hơn rất nhiều.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item row no-gutters">
                            <div className="row evaluate-card">
                                <div className="col-sm-4">
                                    <div className="card border-info mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">Võ Thị Ngọc Ánh</h5>
                                            <p className="card-text text-secondary">Tôi có ấn tượng mạnh với CV ứng viên được gửi từ RankWork. CV trình bày rất rõ ràng, bắt mắt, giúp tôi thấy ngay được điểm mạnh của từng ứng viên. Nhờ đó mà công tác Tuyển dụng cũng thuận lợi hơn.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="card border-info mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">Mrs. Thúy Trinh</h5>
                                            <p className="card-text text-secondary">RankWork là một ý tưởng rất sáng tạo và thực tế. Tôi đã chỉnh sửa CV của mình tốt lên hơn rất nhiều từ những mẫu tham khảo trên trang web.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="card border-info mb-3">
                                        <div className="card-body">
                                            <h5 className="card-title">Mr. Ngọc Châu</h5>
                                            <p className="card-text text-secondary">Tôi có kinh nghiệm 10 năm trong việc quản lý, tuy nhiên đến giờ CV nhìn vẫn không chuyên nghiệp. RankWork đã giúp tôi có CV chuẩn và chuyên nghiệp hơn rất nhiều.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <a className="carousel-control-prev" href="#carouselEvaluate" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon bg-dark" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselEvaluate" role="button" data-slide="next">
                        <span className="carousel-control-next-icon bg-dark" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                <div className="row text-center mt-5 evaluate-data">
                    <div className="col-sm-4">
                        <h1 className="card-title">2,500,000+</h1>
                        <p className="card-text text-secondary">Professional CV updated</p>
                    </div>
                    <div className="col-sm-4">
                        <h1 className="card-title">60,000+</h1>
                        <p className="card-text text-secondary">Employers often find candidates on RankWork</p>
                    </div>
                    <div className="col-sm-4">
                        <h1 className="card-title">2,000,000+</h1>
                        <p className="card-text text-secondary">Candidate found suitable job</p>
                    </div>
                </div>
                <div className="row text-center mt-5 evaluate-data">
                    <div className="col-sm-12">
                        <p className="card-text text-secondary">So why not start your dream job with RankWork?</p>
                        <Link to="/register">
                            <button type="button" className="btn btn-primary btn-dang-ky">Register Now</button>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Evaluate;