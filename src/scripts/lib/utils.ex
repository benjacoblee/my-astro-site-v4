defmodule DataFetcher do
  @url "https://dufs.bnjmn.me/strong.csv"

  def fetch_data() do
    %{body: body} = Req.get!(@url, decode_body: false)
    body
  end
end

NimbleCSV.define(Parser, separator: ";")

defmodule CsvParser do
  def parse(body) do
    Parser.parse_string(body)
  end
end
