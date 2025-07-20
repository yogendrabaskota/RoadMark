/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getPotholeById, voteOnPothole, addComment } from "../services/api";
import useAuth from "../hooks/useAuth";
import { toast } from "react-hot-toast";

const PotholeDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [pothole, setPothole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const [voteLoading, setVoteLoading] = useState(false);

  useEffect(() => {
    const loadPothole = async () => {
      try {
        const { data } = await getPotholeById(id);
        setPothole(data);
      } catch (error) {
        toast.error("Failed to load pothole details");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    loadPothole();
  }, [id, navigate]);

  const handleVote = async (voteType) => {
    if (!user) {
      toast.error("Please login to vote");
      return;
    }

    setVoteLoading(true);
    try {
      const { data } = await voteOnPothole(id, voteType);
      setPothole((prev) => ({
        ...prev,
        votes: data.votes,
      }));
      toast.success(`You ${voteType}d this pothole`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Voting failed");
    } finally {
      setVoteLoading(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const { data } = await addComment(id, comment);
      setPothole((prev) => ({
        ...prev,
        comments: [...prev.comments, data],
      }));
      setComment("");
      toast.success("Comment added");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Pothole Report #{pothole._id.slice(-6).toUpperCase()}
              </h1>
              <p className="text-gray-600 mt-1">
                Reported on {new Date(pothole.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                pothole.status === "reported"
                  ? "bg-yellow-100 text-yellow-800"
                  : pothole.status === "verified"
                  ? "bg-blue-100 text-blue-800"
                  : pothole.status === "fixed"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {pothole.status}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-medium text-gray-900">Details</h2>
              <div className="mt-4 space-y-3">
                <p>
                  <span className="font-medium">Location:</span>{" "}
                  {pothole.address}
                </p>
                <p>
                  <span className="font-medium">Severity:</span>{" "}
                  <span className="capitalize">{pothole.severity}</span>
                </p>
                {pothole.size?.width && (
                  <p>
                    <span className="font-medium">Size:</span>{" "}
                    {pothole.size.width}cm (width) × {pothole.size.depth}cm
                    (depth)
                  </p>
                )}
                <p>
                  <span className="font-medium">Description:</span>{" "}
                  {pothole.description || "No description provided"}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900">Votes</h2>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={() => handleVote("upvote")}
                  disabled={voteLoading}
                  className="flex items-center space-x-1 px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200 disabled:opacity-50"
                >
                  <span>👍</span>
                  <span>{pothole.votes?.upvotes || 0}</span>
                </button>
                <button
                  onClick={() => handleVote("downvote")}
                  disabled={voteLoading}
                  className="flex items-center space-x-1 px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200 disabled:opacity-50"
                >
                  <span>👎</span>
                  <span>{pothole.votes?.downvotes || 0}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-medium text-gray-900">Comments</h2>
            <div className="mt-4 space-y-4">
              {pothole.comments?.length > 0 ? (
                pothole.comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="border-l-4 border-blue-500 pl-4 py-2"
                  >
                    <div className="flex justify-between">
                      <p className="font-medium">
                        {comment.user?.name || "Anonymous"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <p className="mt-1 text-gray-700">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No comments yet</p>
              )}
            </div>

            {user && (
              <form onSubmit={handleCommentSubmit} className="mt-4">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                />
                <button
                  type="submit"
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Post Comment
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PotholeDetails;
