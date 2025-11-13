'use client';

import { useState, useEffect } from 'react';

interface Feature {
  id: string;
  name: string;
  description: string;
  votes: number;
}

const STORAGE_KEY = 'expo-voted-features';

export default function FeatureVoting() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState<string | null>(null);
  const [votedFeatures, setVotedFeatures] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Load voted features from localStorage
    const storedVotes = localStorage.getItem(STORAGE_KEY);
    if (storedVotes) {
      try {
        const votes = JSON.parse(storedVotes);
        setVotedFeatures(new Set(votes));
      } catch (error) {
        console.error('Error loading voted features:', error);
      }
    }
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const response = await fetch('/api/features');
      const data = await response.json();
      setFeatures(data);
    } catch (error) {
      console.error('Error fetching features:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (featureId: string) => {
    if (voting || votedFeatures.has(featureId)) return;

    setVoting(featureId);
    try {
      const response = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ featureId }),
      });

      if (response.ok) {
        // Save to localStorage
        const newVotedFeatures = new Set(votedFeatures);
        newVotedFeatures.add(featureId);
        setVotedFeatures(newVotedFeatures);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(newVotedFeatures)));

        // Refresh features to show updated votes
        await fetchFeatures();
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to vote');
      }
    } catch (error) {
      console.error('Error voting:', error);
      alert('Failed to vote. Please try again.');
    } finally {
      setVoting(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center">
        Vote for Your Most Desired Feature
      </h2>
      <p className="text-gray-300 text-center mb-8 text-sm md:text-base">
        Help us understand your needs by voting for the features you're most excited about
      </p>

      <div className="space-y-4">
        {features.map((feature) => {
          const totalVotes = features.reduce((sum, f) => sum + f.votes, 0);
          const percentage = totalVotes > 0 ? (feature.votes / totalVotes) * 100 : 0;
          const hasVoted = votedFeatures.has(feature.id);

          return (
            <div
              key={feature.id}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-5 md:p-6 hover:bg-white/15 transition-all border border-white/20"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg md:text-xl font-semibold">{feature.name}</h3>
                    {hasVoted && (
                      <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full border border-green-500/30">
                        ✓ Voted
                      </span>
                    )}
                  </div>
                  <p className="text-gray-300 text-sm md:text-base">{feature.description}</p>
                </div>

                <button
                  onClick={() => handleVote(feature.id)}
                  disabled={voting !== null || hasVoted}
                  className={`shrink-0 px-6 py-3 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl ${
                    hasVoted
                      ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  {voting === feature.id ? 'Voting...' : hasVoted ? 'Voted' : 'Vote'}
                </button>
              </div>

              <div className="mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl md:text-3xl font-bold text-white">
                    {feature.votes}
                  </span>
                  <span className="text-base md:text-lg text-gray-300">
                    {feature.votes === 1 ? 'vote' : 'votes'}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {features.length === 0 && (
        <div className="text-center text-gray-400">
          No features available for voting
        </div>
      )}
    </div>
  );
}
