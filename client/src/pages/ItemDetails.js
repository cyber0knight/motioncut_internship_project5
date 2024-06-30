import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/header.js';
import makeRequest from '../axios.js';
import './styles.css';
import StarRating from '../components/starRating.js';

export default function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const [newReview, setNewReview] = useState({
    User_ID: userId,
    Menu_ID: parseInt(id, 10),
    Rating: 0,
    Comment: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await makeRequest.get(`/menu/${id}`);
        setItem(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchItemDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong!</div>;
  if (!item) return <div>Item not found</div>;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview({
      ...newReview,
      [name]: value,
    });
  };

  const handleRatingChange = (rating) => {
    setNewReview({
      ...newReview,
      Rating: rating,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await makeRequest.post(`/reviews/post`, newReview);
      setNewReview({ ...newReview, Rating: 0, Comment: '' });
    } catch (error) {
      console.log(error);
    }
  };

  const addItemToCart = (quantity, price) => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItem = storedCartItems.find(item => item.id === id);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      storedCartItems.push({ id, quantity, price });
    }
    localStorage.setItem('cartItems', JSON.stringify(storedCartItems));
    // alert('Item added to cart successfully!');
    // navigate('/cart');
  };

  return (
    <div className=''>
      <Header type="profile" />
      <div className="item-detail container">
        <div className='row border rounded border-primary mt-5 '>
          <div className='d-flex mt-5 mb-5 flex-wrap align-items-center justify-content-center'>
            <img src={item.image} alt={item.name} style={{ width: "400px" }} />
            <div className='m-5'>
              <h1>{item.name}</h1>
              <p>₹{item.price}</p>
              <button className='btn btn-primary' onClick={() => addItemToCart(1, item.price)}>Add to Cart</button>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className="reviews d-flex flex-column mt-5 align-items-center justify-content-center">
            <h2 className='m-5'>Reviews</h2>
            <div>
              <form className="review-form" onSubmit={handleSubmit}>
                <div>
                  <label>
                    Rating:
                    <div className="star-input">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={star <= newReview.Rating ? 'star filled' : 'star'}
                          onClick={() => handleRatingChange(star)}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </label>
                </div>
                <div>
                  <label>
                    Comment:
                    <textarea
                      name="Comment"
                      value={newReview.Comment}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                </div>
                <button className='mb-5' type="submit">Submit Review</button>
              </form>
              {item.reviews.length > 0 ? (
                item.reviews.map((review, index) => (
                  <div key={index} className="review">
                    <StarRating rating={review.rating} />
                    <p><strong>Comment:</strong> {review.comment}</p>
                    <p><strong>Date:</strong> {new Date(review.review_date).toLocaleString()}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
