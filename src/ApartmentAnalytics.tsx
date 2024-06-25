import React, { useState } from 'react';
import './ApartmentAnalytics.css';

interface Unit {
  id: number;
  type: string;
  number: string;
  views: number;
  favorites: number;
  clickRank: number;
  featured: boolean;
  moveSpeed: number | null;
  crmPriority: boolean;
  marketingPush: {
    search: boolean;
    googleBusinessPage: boolean;
    social: boolean;
  };
}

const sampleUnits: Unit[] = [
  {
    id: 1,
    type: 'S',
    number: '101',
    views: 150,
    favorites: 10,
    clickRank: 3,
    featured: false,
    moveSpeed: null,
    crmPriority: false,
    marketingPush: { search: false, googleBusinessPage: false, social: false },
  },
  {
    id: 2,
    type: 'S',
    number: '102',
    views: 180,
    favorites: 12,
    clickRank: 2,
    featured: false,
    moveSpeed: null,
    crmPriority: false,
    marketingPush: { search: false, googleBusinessPage: false, social: false },
  },
  {
    id: 3,
    type: '1',
    number: '201',
    views: 200,
    favorites: 15,
    clickRank: 1,
    featured: false,
    moveSpeed: null,
    crmPriority: false,
    marketingPush: { search: false, googleBusinessPage: false, social: false },
  },
  {
    id: 4,
    type: '1',
    number: '202',
    views: 120,
    favorites: 8,
    clickRank: 4,
    featured: false,
    moveSpeed: null,
    crmPriority: false,
    marketingPush: { search: false, googleBusinessPage: false, social: false },
  },
  {
    id: 5,
    type: '2',
    number: '301',
    views: 100,
    favorites: 5,
    clickRank: 5,
    featured: false,
    moveSpeed: null,
    crmPriority: false,
    marketingPush: { search: false, googleBusinessPage: false, social: false },
  },
  {
    id: 6,
    type: '2',
    number: '302',
    views: 90,
    favorites: 3,
    clickRank: 6,
    featured: false,
    moveSpeed: null,
    crmPriority: false,
    marketingPush: { search: false, googleBusinessPage: false, social: false },
  },
];

const ApartmentAnalytics: React.FC = () => {
  const [units, setUnits] = useState<Unit[]>(sampleUnits);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredUnits = units.filter(
    (unit) => filter === 'all' || unit.type === filter
  );

  const sortedUnits = [...filteredUnits].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.views - a.views;
  });

  const handleUnitClick = (unit: Unit) => {
    setSelectedUnit(unit);
  };

  const toggleFeature = (id: number) => {
    setUnits(
      units.map((unit) =>
        unit.id === id ? { ...unit, featured: !unit.featured } : unit
      )
    );
  };

  const setMoveSpeed = (id: number, speed: number) => {
    setUnits(
      units.map((unit) =>
        unit.id === id
          ? { ...unit, moveSpeed: unit.moveSpeed === speed ? null : speed }
          : unit
      )
    );
  };

  const toggleCRMPriority = (id: number) => {
    setUnits(
      units.map((unit) =>
        unit.id === id ? { ...unit, crmPriority: !unit.crmPriority } : unit
      )
    );
  };

  const toggleMarketingPush = (
    id: number,
    channel: 'search' | 'googleBusinessPage' | 'social'
  ) => {
    setUnits(
      units.map((unit) =>
        unit.id === id
          ? {
              ...unit,
              marketingPush: {
                ...unit.marketingPush,
                [channel]: !unit.marketingPush[channel],
              },
            }
          : unit
      )
    );
  };

  return (
    <div className="apartment-analytics">
      <h2>Apartment Analytics</h2>
      <div className="filter">
        <label>
          Filter by type:
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="S">Studio</option>
            <option value="1">1 Bedroom</option>
            <option value="2">2 Bedroom</option>
          </select>
        </label>
      </div>
      <div className="pyramid">
        {sortedUnits.map((unit) => (
          <div
            key={unit.id}
            className={`unit-block unit-type-${unit.type} ${
              unit.featured ? 'featured' : ''
            }`}
            onClick={() => handleUnitClick(unit)}
          >
            <div className="unit-info">
              <div className="unit-icon">{unit.type}</div>
              <div className="unit-number">{unit.number}</div>
              <div className="unit-views">{unit.views} views</div>
              <div className="unit-rank">#{unit.clickRank} clicked</div>
              <div className="unit-favorites">{unit.favorites} ❤️</div>
            </div>
            <div className="unit-actions">
              <button
                className={unit.featured ? 'active' : ''}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFeature(unit.id);
                }}
              >
                {unit.featured ? 'Unfeature' : 'Feature'}
              </button>
              <div className="move-speed">
                {[1.25, 1.5, 2.0].map((speed) => (
                  <button
                    key={speed}
                    className={unit.moveSpeed === speed ? 'active' : ''}
                    onClick={(e) => {
                      e.stopPropagation();
                      setMoveSpeed(unit.id, speed);
                    }}
                  >
                    {speed}x
                  </button>
                ))}
              </div>
              <button
                className={unit.crmPriority ? 'active' : ''}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleCRMPriority(unit.id);
                }}
              >
                CRM Priority
              </button>
              <div className="marketing-push">
                {['search', 'googleBusinessPage', 'social'].map((channel) => (
                  <button
                    key={channel}
                    className={
                      unit.marketingPush[
                        channel as keyof typeof unit.marketingPush
                      ]
                        ? 'active'
                        : ''
                    }
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMarketingPush(
                        unit.id,
                        channel as 'search' | 'googleBusinessPage' | 'social'
                      );
                    }}
                  >
                    {channel === 'googleBusinessPage'
                      ? 'GBP'
                      : channel.charAt(0).toUpperCase() + channel.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="featured-bucket">
        <h3>Featured Units</h3>
        {units
          .filter((unit) => unit.featured)
          .map((unit) => (
            <div key={unit.id} className="featured-unit">
              {unit.type} - {unit.number}
            </div>
          ))}
      </div>
      {selectedUnit && (
        <div className="unit-details">
          <h3>Unit Details</h3>
          <p>Type: {selectedUnit.type}</p>
          <p>Number: {selectedUnit.number}</p>
          <p>Views: {selectedUnit.views}</p>
          <p>Click Rank: {selectedUnit.clickRank}</p>
          <p>Favorites: {selectedUnit.favorites}</p>
          <p>Featured: {selectedUnit.featured ? 'Yes' : 'No'}</p>
          <p>Move Speed: {selectedUnit.moveSpeed || 'Not set'}</p>
          <p>CRM Priority: {selectedUnit.crmPriority ? 'Yes' : 'No'}</p>
          <p>Marketing Push:</p>
          <ul>
            <li>Search: {selectedUnit.marketingPush.search ? 'Yes' : 'No'}</li>
            <li>
              Google Business Page:{' '}
              {selectedUnit.marketingPush.googleBusinessPage ? 'Yes' : 'No'}
            </li>
            <li>Social: {selectedUnit.marketingPush.social ? 'Yes' : 'No'}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ApartmentAnalytics;
