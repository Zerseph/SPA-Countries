import { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { filterByActivity, getActivities, setCurrentPage, setActivitiesFilter } from '../../../Redux/actions/actions.js';

// eslint-disable-next-line react/prop-types
function ActivityFilter() {
  const dispatch = useDispatch();
  const activities = useSelector((state) => state.activities);
  const activitiesFilter = useSelector((state) => state.activitiesFilter);

  const handleFilterByActivity = (activityId) => {
    dispatch(setActivitiesFilter(activityId));
    dispatch(filterByActivity(activityId));
    dispatch(setCurrentPage(1));
  };

  useEffect(() => {
    dispatch(getActivities());
  }, [dispatch]);


  return (
    <div>
      <label htmlFor="filterActivity">Filter by Activity:</label>
      <select value={activitiesFilter} id="filterActivity" name="filterActivity" onChange={(event) => handleFilterByActivity(event.target.value)}>
        <option value="">All the activities</option>
        {activities.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {activity.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ActivityFilter;
