while true; do
        xsetroot -name "| DWM | $(uptime -p | cut -d ' ' -f 1 --complement | tr '[a-z]' '[A-Z]') | $(cat /sys/class/net/wlp1s0/operstate | tr '[a-z]' '[A-Z]') | $(cat /sys/class/power_supply/BAT0/capacity)% | $(date)"
        sleep 1
done &

exec dwm
