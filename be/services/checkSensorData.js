const { SensorData } = require('../models/SensorData');
const { Location } = require('../models/Location');

const { LocationItem } = require('../models/LocationItem');
const { Vaccine } = require('../models/Vaccine');
const { User } = require('../models/User');
const { errorType } = require('../services/errorType');

const checkSensorData = async (id) => {
  const sensorData = await SensorData.findByPk(id, {
    include: [
      {
        model: Location,
        attributes: ['location_id', 'name', 'address'],
      },
    ],
  });
  const { temperature, humidity, location } = sensorData;

  const user = User.findByPk(location.responsible_username, {
    attributes: ['username', 'responsible_user_phone'],
  });
  const locationItems = await LocationItem.findAll({
    where: {
      location_id: location.location_id,
    },
    include: [
      {
        model: Vaccine,
        attributes: [
          'vaccine_id',
          'name',
          'min_temperature',
          'max_temperature',
          'min_humidity',
          'max_humidity',
        ],
      },
    ],
  });

  if (!locationItems.length || !user) {
    return null;
  }

  for (const locationItem of locationItems) {
    const { vaccine } = locationItem;

    if (
      temperature < vaccine.min_temperature ||
      temperature > vaccine.max_temperature ||
      humidity < vaccine.min_humidity ||
      humidity > vaccine.max_humidity
    ) {
      return {
        type: errorType.CURRENT_IMPROPER_STATE,
        location_id: location.location_id,
        location_name: location.name,
        location_address: location.address,
        phone: user.phone,
        username: user.username,
        location_item_id: locationItem.location_item_id,
        vaccine_id: vaccine.vaccine_id,
        vaccine_name: vaccine.name,
        error: {
          low_temperature: temperature < vaccine.min_temperature,
          high_temperature: temperature > vaccine.max_temperature,
          low_humidity: humidity < vaccine.min_humidity,
          high_humidity: humidity > vaccine.max_humidity,
        },
      };
    }
  }

  return null;
};

module.exports = {
  checkSensorData,
};
