while true; do
        xsetroot -name "| $(cat /sys/class/net/wlp1s0/operstate | tr '[a-z]' '[A-Z]') | $(cat /sys/class/power_supply/BAT0/capacity)% | $(free -m | head -2 | tail -1 | tr -s ' ' | cut -d ' ' -f 7) MiB | $(uptime -p | cut -d ' ' -f 1 --complement | tr '[a-z]' '[A-Z]') | $(date +'%T') |"
        sleep 1
done &

exec dwm
