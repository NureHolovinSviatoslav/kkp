#!/usr/bin/env bash

export LC_NUMERIC="en_US.UTF-8"
srand_seed=$(date +%s)

for day in {1..30}; do
  for i in {1..10}; do
    ts=$(printf "2025-05-%02dT%02d:%02d:%02dZ" "$day" $((RANDOM%24)) $((RANDOM%60)) $((RANDOM%60)))
    temp=$(awk -v seed=$((srand_seed+day+i)) -v min=21 -v max=30 'BEGIN{srand(seed); printf "%.2f", min+rand()*(max-min)}')
    hum=$(awk -v seed=$((srand_seed+day+i+1000)) -v min=50 -v max=70 'BEGIN{srand(seed); printf "%.2f", min+rand()*(max-min)}')
    json=$(printf '{"location_id":"3","temperature":%s,"humidity":%s,"updated_at":"%s"}' "$temp" "$hum" "$ts")
    curl -s -X POST http://localhost:3000/sensorData \
      -H "Content-Type: application/json" \
      -d "$json"
  done
done
